import React from 'react';
import ReactDOM from 'react-dom';
import Example from "./Example";

const app = document.getElementById('app')

function App() {
    return (
        <div className="container">
            <div>Hello there</div>
            <Example />
        </div>
    );
}

export default App;

if (app) {
    ReactDOM.render(<App />, app);
}
