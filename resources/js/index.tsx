import React from "react";
import ReactDOM from 'react-dom';
import App from "./components/App";
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

// TODO Disable StrictMode
ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.getElementById('root'));
