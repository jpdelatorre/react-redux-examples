
// ES6 feature - destructing assignment
// more info at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { Component } = React;
const { render } = ReactDOM;

// ES6 class declaration
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class App extends Component {
    // render() is a required method in a React component and it should
    // return a single node
    render() {
        // HTML/XML-like syntax inside javascript is called JSX
        // https://facebook.github.io/react/docs/jsx-in-depth.html
        // Things to note about JSX
        // - HTML elements are lower-cased '<div>, <p>, <h1>'
        // - Custom React component are title-cased '<App>, <MyCustomComponent>'
        // - HTML attributes class uses 'className' <div className="container">
        // - All elements needs to be closed properly. Using <img src=".."> won't work
        //   needs to be <img src="..." />
        return <div className="container">
            <h1 className="page-header">Simple React Component</h1>
            <p>Hello World - from a React Component</p>
            <p>You can install this <a target="_blank" href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en">React Developer Tools</a> Chrome extension to inspect your React elements like normal HTML elements</p>
        </div>
    }
}

// render from ReactDOM library that mounts your React component to the HTML DOM.
// - takes two arguments, first is your component and second, the HTML element to render in
render(<App />, document.getElementById('root'));
