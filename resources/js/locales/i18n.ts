import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import common_en from './translations/en/common.json'
import common_ru from './translations/ru/common.json'
// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        common: common_en               // 'common' is our custom namespace
    },
    ru: {
        common: common_ru               // 'common' is our custom namespace
    }


};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

       // keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
