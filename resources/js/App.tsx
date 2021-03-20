import React, {useState,useEffect} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import * as Cookies from "js-cookie";
import Footer from "./components/Footer";
import {useTranslation} from "react-i18next";
import i18next from "i18next";


import {connect, useDispatch, useStore} from 'react-redux'


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
            'Content-Language': i18next.language

        },

    });
    if (!response.ok)
    {
        Cookies.remove('access_token');
        Cookies.remove('user_id');
    }
    return response.ok;
}

interface AppProps
{
    state:any,
    dispatch:any
}
const App = (props:AppProps) => {

    return( <>
            { props.state.init &&
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact>
                            {props.state.authorized ?
                                <Redirect to={'/dashboard'}/> :
                                <Auth auth={false} afterAuth={() => true}/>
                            }
                        </Route>
                        <Route path="/dashboard" exact>
                            {props.state.authorized ?
                                <Dashboard afterLogOut={() => true} auth={true}/> :
                                <Redirect to={'/'}/>
                            }
                        </Route>
                    </Switch>
                    <Footer/>
                </BrowserRouter>
            }
        </>
    );
}

const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
