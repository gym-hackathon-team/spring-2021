import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {DefaultButton} from "@fluentui/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import * as Cookies from "js-cookie";
import {Icon} from '@fluentui/react/lib/Icon';
import {useTranslation} from "react-i18next";

const LogOutIcon = () => <Icon iconName="SignOut"/>;
import {log_out} from "../utils/user";


const Dashboard = () => {
    const {t, i18n} = useTranslation('common');
    const history = useHistory();
    return (<>
            <div className={'Nav'}>
                <h1 className={'header'}>{t('Dashboard.header')}</h1>
                <DefaultButton onClick={() => {
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
