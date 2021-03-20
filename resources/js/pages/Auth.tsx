import React, {useState} from "react";
import AuthForm from "../components/AuthForm";
import {NavLink, Redirect} from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import PasswordResetForm from "../components/PasswordResetForm";



const Auth = () => {
    const [type, setType] = useState('login');
    const changeForm = (type: string) => {
        setType(type);
    }
    return (

            <div className="AuthFormWrapper">
                {
                    type === 'login' &&
                    <AuthForm changeForm={changeForm} />
                }
                {
                    type === 'register' &&
                    <RegisterForm changeForm={changeForm} />
                }
                {
                    type === 'reset' &&
                    <PasswordResetForm changeForm={changeForm} />
                }
            </div>
    );
}

export default Auth;
