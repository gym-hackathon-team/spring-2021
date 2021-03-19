import React from "react"
import {useTranslation} from "react-i18next";

const Navbar: React.FC = () => {
    const {t, i18n} = useTranslation('common');

    return (<div>{t('Navbar.text')}</div>);
}

export default Navbar;

