const { Component } = React;
const { render } = ReactDOM;

// React components have its own state per each instance
// component state is only accessible to that component instance only
// component state is accessible via this.state.property_name and
// can be set using this.setState(new_state_object);
// You can set a default value for state inside the component's constructor
class MyCustomComponent extends Component {
    // Constructor are initialized with `props` argument
    constructor(props) {
        super(props); // don't forget to call the parent constructor first

        // This is how you set a default value for your state
        this.state = {
            name: 'John'
        };

        // Let's increment this whenever we re-render the component
        this.renderCount = 0;
    }
    changeName(name) {
        // Calling this.setState will trigger a re-render to the component
        // that's why you'll see the updated value inside your render function
        // that is referencing this.state.name
        // - Don't try to change the state value other than using this.setState()
        this.setState({
            name: name
        });
    }
    render() {
        // if you click the button multiple times you'll see that the component is
        // always being re-rendered.
        // Re-rendering doesn't really mean re-rending the DOM.
        // It only re-renders in it's virtual DOM then React computes if there
        // are changes and if it needs to update the real DOM.
        // There are ways to skip re-rendering if you're sure your component doesn't need to
        console.log('Component rendered - ' + this.renderCount++);
        return <div>
            <h3>Hello {this.state.name}</h3>
            <button
                className="btn btn-primary btn-md"
                onClick={() => this.changeName('Smith')}>
                Change Name
            </button>
        </div>
    }
}

class App extends Component {
    showInConsole(text) {
        console.log(text);
    }

    render() {
        return <div className="container">
            <h1 className="page-header">React Component State</h1>
            <MyCustomComponent />
        </div>
    }
}

render(<App />, document.getElementById('root'));
