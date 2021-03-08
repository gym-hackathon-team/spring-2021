import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";

const App: React.FunctionComponent = () => {
    return <BrowserRouter>
        <Switch>
            <Route component={Auth} path="/" exact />
            <Route component={Dashboard} path="/dashboard" />
        </Switch>
    </BrowserRouter>;
}

export default App;
