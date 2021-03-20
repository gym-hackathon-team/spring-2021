import React, {useState} from "react"
import SwitchLanguage from "./SwitchLanguage";
import {DefaultButton, DefaultEffects,  TextField} from "@fluentui/react";
import {Redirect,Link} from "react-router-dom";
import {connect} from "react-redux";
import {HeaderAction} from "../actions/user";

interface FooterProps
{
    state: any,
    dispatch: any
}
const Footer = (props:FooterProps) => {
    //const [redirect, setRedirect] = useState({redirect: false, path: ''});
    return (
        <div className={'Footer'}>
            <Link to={'/stream'} >Stream</Link>
            <Link to={'/stats'} >Stats</Link>
            <Link to={'/history'} >History</Link>
            <Link to={'/user'} >Account</Link>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);
