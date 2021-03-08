import React, {useState,useEffect} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";

async function checkAuth() {
    const token = localStorage.getItem('access_token');
    if (token == null) {
        return false;
    }
    let response = await fetch('/api/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },

    });
    return response.ok;
}


const App: React.FunctionComponent = () => {
    const [auth, setAuth] = useState(false);
    useEffect(()=>{
        checkAuth().then(value => {
            setAuth(value);
        })
    },[]);

    return <BrowserRouter>
        <Switch>
            <Route path="/" exact>
                 <Auth auth={auth} afterAuth={()=>setAuth(true)}/>
            </Route>
            <Route path="/dashboard">
                 <Dashboard afterLogOut={()=>setAuth(false)} auth ={auth}/>
            </Route>
        </Switch>
    </BrowserRouter>;
}

export default App;
