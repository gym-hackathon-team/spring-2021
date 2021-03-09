import React, {useState} from "react";
import AuthForm from "../components/AuthForm";
import {NavLink, Redirect} from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export interface AuthFormProps
{
    afterAuth: ()=>any,
    auth:boolean,
}
const Auth = (props:AuthFormProps) => {
    const [type,setType]=useState(true);
    return (
    props.auth ?
        <Redirect to={'/dashboard'}/> :
    <div className="AuthFormWrapper">
        {
            type ?
                <AuthForm register={() => setType(!type)} afterAuth={props.afterAuth}/>
                :
                <RegisterForm login={() => setType(!type)} afterAuth={() => {
                }}/>
        }
    </div>
    );
}

export default Auth;
