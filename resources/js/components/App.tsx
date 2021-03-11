import React, {useState,useEffect} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import * as Cookies from "js-cookie";

async function checkAuth() {
    const token = Cookies.get('access_token');
    const user_id=Cookies.get('user_id');
    if (token == null || user_id==null) {
        return false;
    }
    let response = await fetch(`/api/user/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
            'Accept' : 'application/json',
        },

    });
    if (!response.ok)
    {
        Cookies.remove('access_token');
        Cookies.remove('user_id');
    }
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
