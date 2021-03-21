import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import * as Cookies from "js-cookie";
import Footer from "./components/Footer";
import {useTranslation} from "react-i18next";
import i18next from "i18next";


import {connect, useDispatch, useStore} from 'react-redux'
import UserPage from "./pages/UserPage";
import Header from "./components/Header";
import NewHeader from "./components/NewHeader";
import {DefaultEffects} from "@fluentui/react";
import History from './pages/History'
import {Stream,StreamID} from "./pages/Stream";

interface AppProps {
    state: any,
    dispatch: any
}

export const App = (props: AppProps) => {
    const {t, i18n} = useTranslation('common');

    return (<>
            {props.state.init &&
            <BrowserRouter>

                <div
                     className={props.state.authorized ? 'authorized_container' : ''}>
                    <div style={props.state.authorized ?{boxShadow: DefaultEffects.elevation8}:{}} className={props.state.authorized ? 'container1' : ''}>

                    {
                        props.state.authorized &&


                            <NewHeader />

                    }

                    <Switch>
                        <Route path="/" exact>
                            {props.state.authorized ?
                                <Redirect to={'/history'}/> :
                                <Auth/>
                            }
                        </Route>
                        <Route path="/history" exact>
                            {props.state.authorized ?
                                <History t={t}/> :
                                <Redirect to={'/'}/>
                            }
                        </Route>
                        <Route path="/user" exact>
                            {props.state.authorized ?
                                <UserPage t={t}/> :
                                <Redirect to={'/'}/>
                            }
                        </Route>

                        <Route path="/stats" exact>
                            {props.state.authorized ?
                                <div>Stats</div> :
                                <Redirect to={'/'}/>
                            }
                        </Route>


                        <Route path="/stream"  exact>
                            {props.state.authorized ?
                                <Stream id={'none'} state={props.state} dispatch={props.dispatch}/> :
                                <Redirect to={'/'}/>
                            }
                        </Route>

                        <Route path="/stream/:id"  exact>
                            {props.state.authorized ?
                                <StreamID state={props.state} dispatch={props.dispatch}/> :
                                <Redirect to={'/'}/>
                            }
                        </Route>

                    </Switch>
                    {props.state.authorized &&

    <                   Footer/>

                    }
                </div>
                </div>
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
