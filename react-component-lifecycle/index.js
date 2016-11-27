const { Component } = React;
const { render } = ReactDOM;

// When you add a component, it will create a component instance and it will go through
// constructor -> componentWillMount -> render -> componentDidMount

// After it is mounted, when a setState() is invoked, it will re-render and go through
// shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

// When it's props changes it will go through
// componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

class MyCustomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            greeting: 'Hello'
        }
        console.log('constructor');
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        // This is where you put any script that needs a reference to the real DOM.
        console.log('componentDidMount');
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        // You can optimize your component by checking here if your component
        // really needs to re-render.
        console.log('shouldComponentUpdate');

        // In this example we can avoid re-rendering this component when
        // it's parent component calls the changeTitle
        // Here we are checking if the props.name changes and if didn't
        // don't re-render
        if (nextProps.name === this.props.name && nextState.greeting === this.state.greeting) {
            return false;
        }

        return true;
    }

    componentWillUpdate() {
        // Don't use this.setState here... it can cause a render loop since
        // this is triggered by a setState and is expected to call the render
        // so calling setState here will trigger another re-render without finishing
        // the previous re-render path.
        console.log('componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    changeGreeting(greeting) {

        console.log('this will trigger re-render');
        this.setState({
            greeting
        });
    }

    render() {
        console.log('render');
        return <div>
            <h3>{this.state.greeting} {this.props.name}</h3>
            <p>Events that trigger component re-render</p>
            <button
                className="btn btn-primary btn-md"
                onClick={() => this.props.handleClick('Smith')}>
                Change Name
            </button> - this will call parent component change name
            <br /><br />
            <button
                className="btn btn-primary btn-md"
                onClick={() => this.changeGreeting('Howdy')}>
                Change Greeting
            </button> - this will call this.setState
        </div>
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'React Component Lifecycle',
            name: 'John'
        }
    }

    changeTitle(title) {
        // this.state.greeting isn't used in MyCustomComponent but whenever
        // parent component calls this.setState, all children components will
        // trigger re-render.
        // You can skip re-rendering in children by returning false
        // inside the child component's shouldComponentUpdate
        console.log('setState in App component - state.title');
        this.setState({title});
    }

    changeName(name) {
        console.log('setState in App component - state.name');
        this.setState({name});
    }

    render() {
        return <div className="container">
            <h1 className="page-header">{this.state.title}</h1>
            <button className="btn btn-info" onClick={() => this.changeTitle('Who changed my title?')}>Change Title</button> - this calls setState
            <br />
            <br />
            <button className="btn btn-info" onClick={() => this.changeName('JP')}>Change Name</button> - this calls setState and pass a new value to MyCustomComponent
            <hr />
            <MyCustomComponent name={this.state.name} handleClick={this.changeName.bind(this)} />
        </div>
    }
}

render(<App />, document.getElementById('root'));
