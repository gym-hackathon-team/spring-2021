import React, {useState} from "react";
import AuthForm from "../components/AuthForm";
import {NavLink, Redirect} from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import PasswordResetForm from "../components/PasswordResetForm";

export interface AuthPageProps {
    afterAuth: () => any,
    auth: boolean,
}

const Auth = (props: AuthPageProps) => {
    const [type, setType] = useState('login');
    const changeForm = (type: string) => {
        setType(type);
    }
    return (
        props.auth ?
            <Redirect to={'/dashboard'}/> :
            <div className="AuthFormWrapper">
                {
                    type === 'login' &&
                    <AuthForm changeForm={changeForm} afterAuth={props.afterAuth}/>
                }
                {
                    type === 'register' &&
                    <RegisterForm changeForm={changeForm} afterAuth={() => {
                }}/>
                }
                {
                    type === 'reset' &&
                    <PasswordResetForm changeForm={changeForm} afterAuth={() => {
                    }}/>
                }
            </div>
    );
}

export default Auth;
