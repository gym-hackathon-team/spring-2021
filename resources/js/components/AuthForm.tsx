import React, {useEffect} from "react";
import {useState} from "react";
import {DefaultButton, DefaultEffects, TextField, Link} from "@fluentui/react";
import {useTranslation} from 'react-i18next';
import Alert from "./Alert";

import {sign_in} from "../utils/user";


export interface AuthFormProps {

    changeForm: (type: string) => any
}

const AuthForm = (props: AuthFormProps) => {
    const {t, i18n} = useTranslation('common');
    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const [login, setLogin] = useState('');
    const [authorized, SetAuthorised] = useState(false);


    const [password, setPassword] = useState('');

    const [alert, setAlert] = useState({type: 'default', message: ''});

    const onChangeLogin = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (String(newValue).length <= 60) {
                setLogin(newValue || '');
            }
        },
        [],
    );
    const onChangePassword = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (String(newValue).length <= 20) {
                setPassword(newValue || '');
            }
        },
        [],
    );
    const getLoginErrorMessage = (value: string): string => {

        return regEmail.test(value) || value === '' ? '' : t('AuthForm.incorrectEmail');
    };

    const getPasswordErrorMessage = (value: string): string => {

        return value.length >= 6 && value.length <= 20 || value === '' ? '' : t('AuthForm.incorrectPassword');
    };

    const showErrorAlert = (text: string) => {
        setAlert({type: 'error', message: text})
    };
    const showWarningAlert = (text: string) => {
        setAlert({type: 'warning', message: text})
    };
    const showSuccessAlert = (text: string) => {
        setAlert({type: 'success', message: text})
    };
    const showDefaultAlert = (text: string) => {
        setAlert({type: 'default', message: text})
    };

    const afterAlertClose = React.useCallback(() => setAlert({type: 'default', message: ''}), []);
    return (

        <div style={{boxShadow: DefaultEffects.elevation8}} className={'AuthForm'}>
            <h1 className={'main_header'}>Sign In</h1>


            <p className={'p_1'}>Dont’t have an account? <Link onClick={() => props.changeForm('register')} underline>
                Sign up
            </Link>
            </p>


            <div className={'auth_text_field'}>
                <TextField style={{width: "100%"}} label={t("AuthForm.textFieldEmail")}
                           onGetErrorMessage={getLoginErrorMessage}
                           deferredValidationTime={500} value={login} onChange={onChangeLogin}/>
            </div>
            <div className={'auth_text_field'} style={{marginBottom:'2em'}}>
                <TextField style={{width: "100%"}} label={t("AuthForm.textFieldPassword")} onGetErrorMessage={getPasswordErrorMessage}

                           canRevealPassword type={'password'} value={password}
                           deferredValidationTime={500}
                           onChange={onChangePassword}/>
            </div>
            <p className={'p_1'}><Link onClick={() => props.changeForm('reset')} underline>Forgot your password?


            </Link>
            </p>
            <DefaultButton
                style={{width:'100%',background:"#16B5E8"}}
                primary
                disabled={!regEmail.test(login) || password.length < 6 || password.length > 20}

                           onClick={async () => {
                               let auth = await sign_in(login, password);
                               if (auth.auth) {

                               } else {
                                   showErrorAlert(auth.message);
                               }

                               SetAuthorised(auth.auth);


                           }
                           }>
                {t('AuthForm.ButtonLogin')}
            </DefaultButton>

            <div className={'alert_message'}>
                {alert.message.length > 0 &&
                <Alert type={alert.type} afterClose={afterAlertClose} message={alert.message}/>
                }
            </div>
        </div>

    )
}

export default AuthForm;
