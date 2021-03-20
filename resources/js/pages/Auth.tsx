import React, {useState} from "react";
import AuthForm from "../components/AuthForm";
import {NavLink, Redirect} from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import PasswordResetForm from "../components/PasswordResetForm";
import {DefaultButton, DefaultEffects} from '@fluentui/react'


const Auth = () => {
    const [type, setType] = useState('initial');
    const changeForm = (type: string) => {
        setType(type);
    }
    return (

        <div className="AuthFormWrapper">
            {

                type === 'initial' &&
                <>
                    <div style={{boxShadow: DefaultEffects.elevation8}} className={'AuthForm'}>
                        <h1 className={'main_header'}>Welcome to the</h1>
                        <h1 className={'head1'}>LiveCommerce</h1>
                        <p className={'p_1'}>Log in to create stream</p>
                        <div className={'center_block'}>
                        <DefaultButton style={{width:'100%',background:"#16B5E8"}} primary onClick={() => setType('login')}>Sign In</DefaultButton>
                        </div>
                        <div className={'center_block'} >
                        <DefaultButton style={{width:'100%',background:"#16B5E8"}} primary onClick={() => setType('register')}>Sign Up</DefaultButton>
                        </div>
                    </div>
                </>
            }
            {

                type === 'login' &&
                <AuthForm changeForm={changeForm}/>
            }
            {
                type === 'register' &&
                <RegisterForm changeForm={changeForm}/>
            }
            {
                type === 'reset' &&
                <PasswordResetForm changeForm={changeForm}/>
            }
        </div>
    );
}

export default Auth;
