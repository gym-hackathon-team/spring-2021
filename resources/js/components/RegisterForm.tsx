import React, {useEffect} from "react";
import {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {DefaultButton, DefaultEffects, Link, TextField} from "@fluentui/react";
import Alert from "./Alert";
import {useTranslation} from "react-i18next";

async function register(email: string, password: string, name: string) {
    let data = {
        email: email, password: password, name: name
    };
    let response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        //alert('Success!');
        return true;
    } else {
        //alert('Error!');
        return false;
    }
}

export interface RegisterFormProps {
    afterAuth: () => any,
    login: () => any
}

const RegisterForm = (props: RegisterFormProps) => {
    const {t, i18n} = useTranslation('common');

    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const [alert, setAlert] = useState({type: 'default', message: ''});

    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const onChangeLogin = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (String(newValue).length <= 60) {
                setLogin(newValue || '');
            }
        },
        [],
    );
    const onChangeName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (String(newValue).length <= 60) {
                setName(newValue || '');
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
    const onChangePasswordConfirm = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (String(newValue).length <= 20) {

                setPasswordConfirm(newValue || '');
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

            <div className={'alert_message'}>
                {alert.message.length > 0 &&
                <Alert type={alert.type} afterClose={afterAlertClose} message={alert.message}/>
                }
            </div>

            <Link onClick={props.login} underline>
                {t('AuthForm.linkLogin')}
            </Link>
            <div className={'auth_text_field'}>
                <TextField placeholder={t('AuthForm.textFieldName')} underlined value={name} onChange={onChangeName}/>
            </div>
            <div className={'auth_text_field'}>
                <TextField placeholder={t('AuthForm.textFieldEmail')} onGetErrorMessage={getLoginErrorMessage}
                           deferredValidationTime={500} underlined value={login} onChange={onChangeLogin}/>
            </div>
            <div className={'auth_text_field'}>
                <TextField placeholder={t('AuthForm.textFieldPassword')}
                           onGetErrorMessage={getPasswordErrorMessage}
                           deferredValidationTime={500}
                           underlined canRevealPassword type={'password'} value={password} onChange={onChangePassword}/>
            </div>
            <div className={'auth_text_field'}>
                <TextField placeholder={t('AuthForm.textFieldConfirmPassword')}
                           onGetErrorMessage={getPasswordErrorMessage}
                           deferredValidationTime={500}
                           underlined canRevealPassword type={'password'} value={passwordConfirm}
                           onChange={onChangePasswordConfirm}/>
            </div>
            <DefaultButton onClick={async () => {
                let reg: boolean = await register(login, password, name);
                if (reg) {
                    showSuccessAlert(t('AuthForm.AlertSuccessRegistration'));
                    setPasswordConfirm('');
                    setLogin('');
                    setName('');
                    setPassword('');

                } else {
                    showErrorAlert(t('AuthForm.AlertFailedRegistration'));
                }


            }
            }
                           disabled={!(!(password.length < 6 || password.length > 20) && !(passwordConfirm.length < 6 || passwordConfirm.length > 20) && name !== '' && regEmail.test(login) && password === passwordConfirm)}>
                {t('AuthForm.ButtonRegistration')}
            </DefaultButton>


        </div>

    )
}

export default RegisterForm;
