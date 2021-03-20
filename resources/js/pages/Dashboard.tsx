import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {DefaultButton} from "@fluentui/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import * as Cookies from "js-cookie";
import {Icon} from '@fluentui/react/lib/Icon';
import {useTranslation} from "react-i18next";




const Dashboard = () => {
    const {t, i18n} = useTranslation('common');
    const history = useHistory();
    return (<>


            <div className={'content'}>
                <h3 className={'header'}>{t('Dashboard.textContent')}</h3>
            </div>


        </>
    );
}

export default Dashboard;
