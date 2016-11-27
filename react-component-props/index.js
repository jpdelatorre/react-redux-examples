const { Component } = React;
const { render } = ReactDOM;

// - You can pass data to another component by adding attributes
// - Passed data are accessible to the child component using
//   this.props.attribute_name
// - You can pass object or function or component as props
class MyCustomComponent extends Component {
    render() {
        // Style attributes works differently. It needs to be an object and not a string
        // <div style="border:1px solid #f00"> won't work.
        const containerStyles = {
            border: '1px solid #900',
            background: '#f5f5f5',
            padding: '20px'
        };
        const headingStyles = {
            padding: '0',
            margin: '0 0 8px',
            fontSize: '18px'
        };
        return <div style={containerStyles}>
            <h2 style={headingStyles}>Hello {this.props.name}</h2>
            <p>This is the <b>MyCustomComponent</b></p>
            <button
                className="btn btn-primary btn-md"
                onClick={() => this.props.handleClick('You clicked me...')}>
                This will call a function from the parent component
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
            <h1 className="page-header">React Component Props</h1>
            <MyCustomComponent name="John" handleClick={this.showInConsole} />
        </div>
    }
}

render(<App />, document.getElementById('root'));
