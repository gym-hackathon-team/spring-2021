import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {DefaultButton, DefaultEffects, Link, TextField} from "@fluentui/react";
import Alert from "./Alert";
import * as Cookies from "js-cookie";
import i18next from "i18next";
import {resetPassword, sendEmail, validate} from "../utils/user";



export interface PasswordResetForm {

    changeForm: (type: string) => any
}

export const PasswordResetForm = (props: PasswordResetForm) => {
    const {t, i18n} = useTranslation('common');


    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const [state, setState] = useState('input_email');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [alert, setAlert] = useState({type: 'default', message: ''});

    const onChangeEmail = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (String(newValue).length <= 60) {
                setEmail(newValue || '');
            }
        },
        [],
    );

    const onChangeToken = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {

            setToken(newValue || '');

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
    const getEmailErrorMessage = (value: string): string => {

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




            {state === "input_email" &&
            <>

                <h1 className={'main_header'}>Reset password</h1>

                <p className={'p_1'}>Enter the email associated with your account and we’ll send an email with instructions to reset your password

                </p>

                <div className={'auth_text_field'} style={{marginBottom:'2em'}}>
                    <TextField style={{width: "100%"}} label={t('AuthForm.ResetPasswordLabel1')} onGetErrorMessage={getEmailErrorMessage}
                               deferredValidationTime={500}  value={email} onChange={onChangeEmail}/>
                </div>

                <DefaultButton
                    style={{width:'100%',background:"#16B5E8"}}
                    primary
                    disabled={email === '' || !regEmail.test(email)}
                               onClick={() => {
                                   sendEmail(email).then(value => {
                                       if (value.status === 'success') {

                                           showDefaultAlert(value.message);
                                           setState('input_token');

                                       } else {
                                           showErrorAlert(value.message as string);
                                       }

                                   })
                               }}>
                    {t('AuthForm.ResetPasswordSendEmail')}


                </DefaultButton>


            </>
            }

            {state === "input_token" &&
            <>

                <h1 className={'main_header'}>Check your mail</h1>

                <p className={'p_1'}>We have sent a password recover instructions to your email. Did not receive the email? Check your spam filter.
                </p>

                <div className={'auth_text_field'} style={{marginBottom:'2em'}}>
                    <TextField style={{width: "100%"}} label={t('AuthForm.InputToken')}
                                value={token} onChange={onChangeToken}/>
                </div>


                <DefaultButton
                    style={{width:'100%',background:"#16B5E8"}}
                    primary
                    disabled={token === ""}
                               onClick={() => {
                                   validate(email, token).then(value => {
                                       if (value.status === 'success') {
                                           if (value.result) {
                                               showDefaultAlert(t('AuthForm.InputNewPassword'));
                                               setState('input_password');
                                           } else {
                                               showErrorAlert(t('AuthForm.ResetPasswordBadToken'));
                                           }
                                       } else {
                                           showErrorAlert(t('AuthForm.errorMes'));
                                       }
                                   });
                               }}>
                    {t('AuthForm.ResetPasswordSendEmail')}


                </DefaultButton>
            </>
            }


            {state === "input_password" &&
            <>
                <h1 className={'main_header'}>Create new password</h1>

                <p className={'p_1'}>Your new password must be different from previous used passwords</p>

                <div className={'auth_text_field'}>
                    <TextField style={{width: "100%"}} label={t('AuthForm.textFieldPassword')}
                               onGetErrorMessage={getPasswordErrorMessage}
                               deferredValidationTime={500}
                                canRevealPassword type={'password'} value={password}
                               onChange={onChangePassword}/>
                </div>
                <div style={{marginBottom:'2em'}} className={'auth_text_field'}>
                    <TextField style={{width: "100%"}} label={t('AuthForm.textFieldConfirmPassword')}
                               onGetErrorMessage={getPasswordErrorMessage}
                               deferredValidationTime={500}
                                canRevealPassword type={'password'} value={passwordConfirm}
                               onChange={onChangePasswordConfirm}/>
                </div>

                <p className={'p_1'}>Both passwords must match.</p>

                <DefaultButton
                    style={{width:'100%',background:"#16B5E8"}}
                    primary
                    disabled={password !== passwordConfirm ||
                (password.length < 6 || password.length > 20) ||
                (passwordConfirm.length < 6 || passwordConfirm.length > 20)}
                               onClick={() => {
                                   resetPassword(email, password, token).then(value => {
                                       if (value.status === 'success') {
                                           showSuccessAlert(value.message);
                                           setEmail('');
                                           setPassword('');
                                           setPasswordConfirm('');
                                           setToken('');

                                           setTimeout(()=>{
                                               props.changeForm('login');
                                           }, 3000);
                                       } else {
                                           showErrorAlert(value.message);
                                       }
                                   });
                               }}>
                    {t('AuthForm.ResetPasswordSendButton')}


                </DefaultButton>

            </>
            }

            <div className={'alert_message'}>
                {alert.message.length > 0 &&
                <Alert type={alert.type} afterClose={afterAlertClose} message={alert.message}/>
                }
            </div>

        </div>

    )
}

export default PasswordResetForm;
