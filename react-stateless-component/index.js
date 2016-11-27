const { Component } = React;
const { render } = ReactDOM;

// If you're not using any state inside your component,
// you can declare your component as a function.
// Stateless components make your app faster as it
// doesn't need to check any state if it needs to re-render.
// It just re-renders when it's props changes
// You cannot call any React component life-cycle methods here...
const MyCustomComponent = (props) => <div>
    <h3>Hello {props.name}</h3>
    <button
        className="btn btn-primary btn-md"
        onClick={() => props.handleClick('Smith')}>
        Call parent component method
    </button>
</div>

class App extends Component {
    showInConsole(text) {
        console.log(text);
    }

    render() {
        return <div className="container">
            <h1 className="page-header">React Stateless Component</h1>
            <MyCustomComponent name="John" handleClick={this.showInConsole} />
        </div>
    }
}

render(<App />, document.getElementById('root'));
