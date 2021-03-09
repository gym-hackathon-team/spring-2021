import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import { DefaultButton } from "@fluentui/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";


import { Icon } from '@fluentui/react/lib/Icon';
const LogOutIcon = () => <Icon iconName="SignOut" />;
async function log_out()
{
    const token = localStorage.getItem('access_token');

    let response = await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },

    });
    if (response.ok) {

        localStorage.removeItem('access_token');
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
    const history = useHistory();
    const [auth,setAuth]=useState(props.auth);
    return (auth ? <>
            <div className={'Nav'}>
                <h1 className={'header'}>Homepage</h1>
                <DefaultButton onClick={()=>{
                    log_out().then(value=>{
                        if (value)
                        {
                            props.afterLogOut();
                            setAuth(false);
                        }
                    })
                }}><LogOutIcon/></DefaultButton>
            </div>

        <div className={'content'}>
            <h3 className={'header'}>Content</h3>
        </div>


    </>
    :
            <Redirect to={'/'}/>
    );
}

export default Dashboard;
