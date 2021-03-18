import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {DefaultButton, DefaultEffects, Link, TextField} from "@fluentui/react";
import Alert from "./Alert";
import * as Cookies from "js-cookie";
import i18next from "i18next";


async function sendEmail(email: string) {

    let data = {
        email: email
    };
    let response = await fetch('/api/password/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': i18next.language
        },
        body: JSON.stringify(data),
    });
    if (response.status == 200) {
        let result = await response.json();

        return {status: 'success', message: result.message, user_id: result.user_id.id};
    } else {
        return {status: 'error'};
    }
}

async function validate(user_id: number, token: string) {


    let response = await fetch(`/api/password/validate/${user_id}/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': i18next.language

        },

    });
    if (response.status == 200) {
        let result = await response.json();

        return {status: 'success', result: result.message};
    } else {
        return {status: 'error'};
    }
}

async function resetPassword(email: string, password: string, token: string) {

    let data = {
        email: email,
        password: password,
        password_confirmation: password,
        token: token
    };
    let response = await fetch('/api/password/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': i18next.language

        },
        body: JSON.stringify(data),
    });
    if (response.status == 200) {
        let result = await response.json();

        return {status: 'success', message: result.message};
    } else {
        return {status: 'error'};
    }
}


export interface PasswordResetForm {
    afterAuth: () => any,
    changeForm: (type: string) => any
}

export const PasswordResetForm = (props: PasswordResetForm) => {
    const {t, i18n} = useTranslation('common');


    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const [state, setState] = useState('input_email');
    const [userID, setUserID] = useState(0);
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

            <div className={'alert_message'}>
                {alert.message.length > 0 &&
                <Alert type={alert.type} afterClose={afterAlertClose} message={alert.message}/>
                }
            </div>
            <Link onClick={() => props.changeForm('login')} underline>
                {t('AuthForm.linkLogin')}
            </Link>

            {state === "input_email" &&
            <>


                <div className={'auth_text_field'}>
                    <TextField placeholder={t('AuthForm.ResetPasswordLabel1')} onGetErrorMessage={getEmailErrorMessage}
                               deferredValidationTime={500} underlined value={email} onChange={onChangeEmail}/>
                </div>

                <DefaultButton disabled={email === '' || !regEmail.test(email)}
                               onClick={() => {
                                   sendEmail(email).then(value => {
                                       if (value.status === 'success') {
                                           setUserID(value.user_id);
                                           showDefaultAlert(value.message);
                                           setState('input_token');

                                       } else {
                                           showErrorAlert(t('AuthForm.ErrorEmail'));
                                       }

                                   })
                               }}>
                    {t('AuthForm.ResetPasswordSendEmail')}


                </DefaultButton>
            </>
            }

            {state === "input_token" &&
            <>


                <div className={'auth_text_field'}>
                    <TextField placeholder={t('AuthForm.InputToken')}
                               underlined value={token} onChange={onChangeToken}/>
                </div>


                <DefaultButton disabled={token === ""}
                               onClick={() => {
                                   validate(userID, token).then(value => {
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


                <div className={'auth_text_field'}>
                    <TextField placeholder={t('AuthForm.textFieldPassword')}
                               onGetErrorMessage={getPasswordErrorMessage}
                               deferredValidationTime={500}
                               underlined canRevealPassword type={'password'} value={password}
                               onChange={onChangePassword}/>
                </div>
                <div className={'auth_text_field'}>
                    <TextField placeholder={t('AuthForm.textFieldConfirmPassword')}
                               onGetErrorMessage={getPasswordErrorMessage}
                               deferredValidationTime={500}
                               underlined canRevealPassword type={'password'} value={passwordConfirm}
                               onChange={onChangePasswordConfirm}/>
                </div>

                <DefaultButton disabled={password !== passwordConfirm ||
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
                                           setUserID(0);
                                           setState('input_email');
                                       } else {
                                           showErrorAlert(t('AuthForm.errorMes'));
                                       }
                                   });
                               }}>
                    {t('AuthForm.ResetPasswordSendButton')}


                </DefaultButton>
            </>
            }

        </div>

    )
}

export default PasswordResetForm;
