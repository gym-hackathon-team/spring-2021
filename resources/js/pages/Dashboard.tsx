import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import { DefaultButton } from "@fluentui/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import * as Cookies from "js-cookie";

import { Icon } from '@fluentui/react/lib/Icon';
import {useTranslation} from "react-i18next";
const LogOutIcon = () => <Icon iconName="SignOut" />;

import {store} from '../index'
import {LogoutAction} from '../actions/user'

async function log_out()
{
    const token = Cookies.get('access_token');

    let response = await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
            'Accept' : 'application/json',
        },

    });
    if (response.ok) {

       // Cookies.remove('access_token');
        //Cookies.remove('user_id');
        store.dispatch(LogoutAction);
        return true;
    }
    else
    {
        console.log("error: " + response.status);
        return false;
    }
}






interface DashboardProps
{
    auth:boolean,
    afterLogOut:()=>any,
}

const Dashboard = (props:DashboardProps) => {
    const {t, i18n} = useTranslation('common');
    const history = useHistory();
    //const [auth,setAuth]=useState(props.auth);
    return (<>
            <div className={'Nav'}>
                <h1 className={'header'}>{t('Dashboard.header')}</h1>
                <DefaultButton onClick={()=>{
                    log_out().then();
                }}><LogOutIcon/></DefaultButton>
            </div>

        <div className={'content'}>
            <h3 className={'header'}>{t('Dashboard.textContent')}</h3>
        </div>


    </>
    );
}

export default Dashboard;
