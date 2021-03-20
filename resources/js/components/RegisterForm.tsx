import React, {useEffect} from "react";
import {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {DefaultButton, DefaultEffects, Link, TextField} from "@fluentui/react";
import Alert from "./Alert";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {register} from "../utils/user";


export interface RegisterFormProps {

    changeForm: (type: string) => any
}

const RegisterForm = (props: RegisterFormProps) => {
    const {t, i18n} = useTranslation('common');
    console.log(i18n.language);
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



            <h1 className={'main_header'}>Sign Up</h1>

            <p className={'p_1'}>Already have an account? <Link onClick={() => props.changeForm('login')} underline>
                Sign in
            </Link>
            </p>

            <div className={'auth_text_field'}>
                <TextField  style={{width: "100%"}} label={t('AuthForm.textFieldName')}  value={name} onChange={onChangeName}/>
            </div>
            <div className={'auth_text_field'}>
                <TextField  style={{width: "100%"}} label={t('AuthForm.textFieldEmail')} onGetErrorMessage={getLoginErrorMessage}
                           deferredValidationTime={500}  value={login} onChange={onChangeLogin}/>
            </div>
            <div className={'auth_text_field'}>
                <TextField label={t('AuthForm.textFieldPassword')}
                           style={{width: "100%"}}
                           onGetErrorMessage={getPasswordErrorMessage}
                           deferredValidationTime={500}
                            canRevealPassword type={'password'} value={password} onChange={onChangePassword}/>
            </div>
            <div style={{marginBottom:'2em'}} className={'auth_text_field'}>
                <TextField label={t('AuthForm.textFieldConfirmPassword')}
                           onGetErrorMessage={getPasswordErrorMessage}
                           deferredValidationTime={500}
                           style={{width: "100%"}}
                            canRevealPassword type={'password'} value={passwordConfirm}
                           onChange={onChangePasswordConfirm}/>
            </div>
            <DefaultButton
                style={{width:'100%',background:"#16B5E8"}}
                primary
                onClick={async () => {


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

            <div className={'alert_message'}>
                {alert.message.length > 0 &&
                <Alert type={alert.type} afterClose={afterAlertClose} message={alert.message}/>
                }
            </div>
        </div>

    )
}

export default RegisterForm;
