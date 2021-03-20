import React from "react"
import {Link, NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {DefaultButton, Icon} from "@fluentui/react";
import {log_out} from "../utils/user";
import SwitchLanguage from "./SwitchLanguage";

const LogOutIcon = () => <Icon iconName="SignOut"/>;

const Header: React.FC = () => {
    const {t, i18n} = useTranslation('common');

    return (
        <div className={'Nav'}>
        <h4 className={'header'}><Link to={'/'}>{t('Dashboard.header')}</Link></h4>
        <h4 className={'header'}><Link to={'/user'}>{'User'}</Link></h4>

        <DefaultButton onClick={() => {
            log_out().then();
        }} ><LogOutIcon/></DefaultButton>
    </div>
    );
}

export default Header;

