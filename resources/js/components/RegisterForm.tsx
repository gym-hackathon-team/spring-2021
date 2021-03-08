import React, {useEffect} from "react";
import {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {DefaultButton, DefaultEffects, Link, TextField} from "@fluentui/react";

async function register(email: string, password: string, name: string) {
    let data = {
        email: email, password: password, name: name
    };
    let response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        alert('Success!');
        return true;
    } else {
        alert('Error!');
        return false;
    }
}

export interface RegisterFormProps {
    afterAuth: () => any,
    login:()=>any
}

const RegisterForm = (props: RegisterFormProps) => {
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const onChangeLogin = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setLogin(newValue || '');
        },
        [],
    );
    const onChangeName = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setName(newValue || '');
        },
        [],
    );
    const onChangePassword = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setPassword(newValue || '');
        },
        [],
    );
    const onChangePasswordConfirm = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setPasswordConfirm(newValue || '');
        },
        [],
    );
    return (

        <div style={{boxShadow: DefaultEffects.elevation8}} className={'AuthForm'}>

            <Link onClick={props.login} underline>
                Login
            </Link>

            <TextField label={"name"} value={name} onChange={onChangeName}/>
            <TextField label={"email"} value={login} onChange={onChangeLogin}/>

            <TextField label={"password"} type={'password'} value={password} onChange={onChangePassword}/>
            <TextField label={"confirm password"} type={'password'} value={passwordConfirm}
                       onChange={onChangePasswordConfirm}/>

            <DefaultButton onClick={async () => {
                let reg: boolean = await register(login, password, name);
                if (reg) {

                        setPasswordConfirm('');
                        setLogin('');
                        setName('');
                        setPassword('');

                }


            }
            }
                           disabled={!(password !== '' && passwordConfirm !== '' && name !== '' && login != '' && password === passwordConfirm)}>
                REGISTER
            </DefaultButton>


        </div>

    )
}

export default RegisterForm;
