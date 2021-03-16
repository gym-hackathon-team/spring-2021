import React from "react"
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Header: React.FC = () => {
    const {t, i18n} = useTranslation('common');

    return (<header>
        <ul>
            <li><NavLink to="/dashboard">{t('Header.text')}</NavLink></li>
        </ul>
    </header>);
}

export default Header;

