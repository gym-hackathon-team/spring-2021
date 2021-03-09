import React, {useEffect} from "react";
import {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {DefaultButton, DefaultEffects, TextField,Link} from "@fluentui/react";
import * as Cookies from "js-cookie";
async function sign_in(email:string,password:string)
{
    let data={
        email:email,password:password};
    let response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    });
    if (response.status==200) {
        let result = await response.json();
        //localStorage.setItem('access_token', result.access_token);
        Cookies.set('access_token',result.access_token);
        Cookies.set('user_id',String(result.id));
        return true;
    }
    else
    {
        console.log("error: " + response.status);
        return false;
    }
}
export interface AuthFormProps
{
    afterAuth: ()=>any,
    register:()=>any
}
const AuthForm = (props:AuthFormProps) => {
    const [login, setLogin] = useState('');
    const [authorized, SetAuthorised]=useState(false);

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

        <Link onClick={props.register} underline>
            Create account
        </Link>
        <TextField label={"email"} value={login} onChange={onChangeLogin}/>

        <TextField label={"password"} type={'password'} value={password} onChange={onChangePassword}/>


        <DefaultButton disabled={login==='' || password===''} onClick={async () => {
            let auth: boolean = await sign_in(login, password);
            if (auth)
            {
                props.afterAuth();
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
