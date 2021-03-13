import React, {useEffect} from "react";
import {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {DefaultButton, DefaultEffects, TextField, Link} from "@fluentui/react";
import {
    MessageBarButton,

    Stack,
    StackItem,
    MessageBar,
    MessageBarType,
    ChoiceGroup,
    IStackProps,
} from 'office-ui-fabric-react';
import * as Cookies from "js-cookie";
import Alert from "./Alert";


async function sign_in(email: string, password: string) {
    let data = {
        email: email, password: password
    };
    let response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.status == 200) {
        let result = await response.json();
        //localStorage.setItem('access_token', result.access_token);
        Cookies.set('access_token', result.access_token);
        Cookies.set('user_id', String(result.id));
        return true;
    } else {
        console.log("error: " + response.status);
        return false;
    }
}

export interface AuthFormProps {
    afterAuth: () => any,
    register: () => any
}

const AuthForm = (props: AuthFormProps) => {
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

        return regEmail.test(value) || value === '' ? '' : `Incorrect email !`;
    };

    const getPasswordErrorMessage = (value: string): string => {

        return value.length >= 6 && value.length <= 20 || value === '' ? '' : `Password must be between 6 and 20 characters !`;
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

            <Link onClick={props.register} underline>
                Create account
            </Link>
            <div className={'auth_text_field'}>
                <TextField placeholder={"email"} onGetErrorMessage={getLoginErrorMessage}
                           deferredValidationTime={500} underlined value={login} onChange={onChangeLogin}/>
            </div>
            <div className={'auth_text_field'}>
                <TextField placeholder={"password"} onGetErrorMessage={getPasswordErrorMessage} underlined
                           canRevealPassword type={'password'} value={password}
                           deferredValidationTime={500}
                           onChange={onChangePassword}/>
            </div>

            <DefaultButton disabled={!regEmail.test(login) || password.length < 6 || password.length > 20}
                           onClick={async () => {
                               let auth: boolean = await sign_in(login, password);
                               if (auth) {
                                   props.afterAuth();
                               } else {
                                   showErrorAlert('Authorization failed!');
                               }

                               SetAuthorised(auth);


                           }
                           }>
                LOGIN
            </DefaultButton>


        </div>

    )
}

export default AuthForm;
