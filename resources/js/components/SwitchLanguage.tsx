import {ComboBox, IComboBoxOption} from "office-ui-fabric-react";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {IComboBoxProps} from "@fluentui/react";
import {checkUserLanguage} from "../locales/i18n";

const switchLanguageOptions: IComboBoxOption[] = [

    {key: 'en', text: 'English'},
    {key: 'ru', text: 'Русский'},

];

const style = {maxWidth: 200, display: 'block', marginTop: '0'};

export const SwitchLanguage: React.FC = () => {
    const {t, i18n} = useTranslation('common');
    const [selectedKey, setSelectedKey] = useState(checkUserLanguage());
    const onChange: IComboBoxProps['onChange'] = (event, option) => {

        setSelectedKey(option!.key as string);
        i18n.changeLanguage(option!.key as string).then();

    };


    return (
        <div>
            <ComboBox

                selectedKey={selectedKey}
                scrollSelectedToTop
                autoComplete="on"
                options={switchLanguageOptions}
                onChange={onChange}
                style={style}
            />

        </div>
    );
};
export default SwitchLanguage;
