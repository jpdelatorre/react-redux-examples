const { Component } = React;
const { render } = ReactDOM;
const { createStore } = Redux;
const { Provider, connect } = ReactRedux;

// Reducer is just a function that accepts two parameters (current state and action object)
// It returns the new state.
// No mutations should be done to the state object.
// It should return a new state object if there are modifications
// let newState = state; does not work.
// Either use Object.assign or the spread syntax
// Using Array's slice, map, filter reduce also works
function reducer(state = {}, action) {
	switch (action.type) {
		case 'CLEAR_ERROR':
			return {
				...state,
				error: ''
			}
		case 'ADD_ITEM':
			if (!action.payload.item) {
				return {
					...state,
					error: 'Item cannot be empty'
				}
			}
			return {
				...state,
				items: [
					...state.items,
					action.payload.item
				]
			}
        case 'EDIT_ITEM':
            return {
                ...state,
                items: [
                    ...state.items.slice(0, action.payload.index),
                    action.payload.item,
                    ...state.items.slice(action.payload.index + 1)
                ]
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                items: [
                    ...state.items.slice(0, action.payload.index),
                    ...state.items.slice(action.payload.index + 1)
                ]
            }
        case 'DELETE_ITEMS':
            return {
                ...state,
                items: state.items.filter(
                    (item, index) => (action.payload.indexes.indexOf(index) === -1)
                )
            }
		default:
			return state;
	}
}

// Selector are helper functions that extract a slice of data from the Redux store tree
// It's good practice to use selectors as it decouples your views to the structure of
// the state
const getItemsSelector = (state) => {
	return state.items;
}

const initialState = {
	items: ['hi', 'hello'],
	error: ''
};

// You pass the reducer and initial state value to create a Redux store
// Redux devtools extensions let's you use a Chrome plugin to view all
// actions dispatched and your redux store
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
const store = createStore(
	reducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Here are some action creators. It's just a function that creates the action object
// that will be passed to the reducers
// Action creators doesn't have to have Action on its name. I just put action to make it
// clear that these functions are action creators
const addItemAction = (item) => {
	return {
		type: 'ADD_ITEM',
		payload: { item }
	}
}

const editItemAction = (index, item) => {
    return {
        type: 'EDIT_ITEM',
        payload: { index, item }
    }
}

const deleteItemAction = (index) => {
    return {
        type: 'DELETE_ITEM',
        payload: { index }
    }
}

const deleteItemsAction = (indexes) => {
    return {
        type: 'DELETE_ITEMS',
        payload: { indexes }
    }
}

const clearErrorAction = () => ({
	type: 'CLEAR_ERROR'
})

// Stateless component
const Item = ({index, item, selectItem, editItem, deleteItem}) => <li className="list-group-item clearfix">
	<div className="checkbox pull-left">
		<label>
			<input
		        type="checkbox"
		        onChange={(e) => {(e.target.value) ? selectItem(index):''}} /> {item}
		</label>
	</div>

	<div className="btn-group pull-right">
		<button
	        className="btn btn-sm btn-info"
	        onClick={() => editItem(index, `${item} - Edited`)}>
	        <span className="glyphicon glyphicon-pencil" />
	    </button>
	    <button
	        className="btn btn-sm btn-danger"
	        onClick={() => deleteItem(index)}>
	        <span className="glyphicon glyphicon-trash" />
	    </button>
	</div>

</li>

class List extends Component {
    constructor(props) {
        super(props);
        this.selectedItems = [];
    }

    selectItem(index) {
        this.selectedItems.push(index);
    }

    render() {
        const {
            selectItem,
            props: {
				error,
                items,
                addItem,
                editItem,
                deleteItem,
                deleteItems,
				clearError
            }
        } = this;

        return <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">My List Component</h3>
            </div>
        	<div className="panel-body">
				{ (error) ?
				<div className="alert alert-danger alert-dismissible">
					<button
						className="close"
						aria-label="Close"
						onClick={clearError}>
						<span aria-hidden="true">&times;</span>
					</button>
					<strong>Error!</strong> {error}
				</div>
				: ''}
                <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        ref={input => this.input = input} />
                    <span className="input-group-btn">
                        <button
                			className="btn btn-primary"
                			onClick={() => {addItem(this.input.value); this.input.value = '';}}>
                			Add an Item
                		</button>
                    </span>
                </div>
            </div>
        	<ul className="list-group">
	        	{items.map(
	        		(item, index) =>
	        		<Item key={index}
	                    index={index}
	                    item={item}
	                    selectItem={selectItem.bind(this)}
	                    editItem={editItem}
	                    deleteItem={deleteItem} />
	        	)}
				<li className="list-group-item clearfix">
					<button
		                className="btn btn-danger pull-left"
		                onClick={() => deleteItems(this.selectedItems)}>
		                Delete Selected
		            </button>
				</li>
        	</ul>
        </div>
    }
}

// This is where you map the data that you need from the Redux store to your component.
// This is where you also use selectors to decouple this component from the structure of
// the Redux store
const mapStateToProps = (state, ownProps) => {
	return {
		error: state.error,
		items: getItemsSelector(state)
	}
}

// This is where you map your action creators to your component's props as functions.
const mapDispatchToProps = {
	addItem: addItemAction,
    editItem: editItemAction,
    deleteItem: deleteItemAction,
    deleteItems: deleteItemsAction,
	clearError: clearErrorAction
}

// connect function let's you bind your action creator and data in the Redux store
// to the component's props
// Every changes in the global store will cause component to re-render and will receive
// the updated data as component props
const ConnectedList = connect(
    mapStateToProps,
    mapDispatchToProps)
    (List);

class App extends Component {
	render() {
		return <div className="container">
			<h1 className="page-header">Simple ReactJS + Redux Demo</h1>
			<ConnectedList />
		</div>
	}
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
