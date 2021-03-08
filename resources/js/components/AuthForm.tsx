import React from "react";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {DefaultButton, DefaultEffects, TextField} from "@fluentui/react";

const AuthForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const onChangeLogin = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setLogin(newValue || '');
        },
        [],
    );
    const onChangePassword = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setPassword(newValue || '');
        },
        [],
    );
    return (
        <div style={{boxShadow: DefaultEffects.elevation8}} className={'AuthForm'}>
            <TextField label={"email"} value={login} onChange={onChangeLogin}/>

            <TextField label={"password"} type={'password'} value={password} onChange={onChangePassword}/>

            <DefaultButton onClick={() => alert(`login : ${login}\npassword : ${password}`)}>
                LOGIN
            </DefaultButton>

            <NavLink to="/dashboard" className="WithoutAuth">To Dashboard</NavLink>


        </div>
    )
}

export default AuthForm;
