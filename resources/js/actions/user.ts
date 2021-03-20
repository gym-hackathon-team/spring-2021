const actions = [
    { type: 'login' },
    { type: 'logout' },
    {type:'check_auth'},
    {type:'init'},
    {type:'header'}

]

export const LoginAction=(token:string,user_id:number)=>
{
    return {
        type:'login',
        payload:{token:token,user_id:user_id}
    }
}

export const HeaderAction=(header:string)=>
    {
        return {
            type: 'header',
            payload: {header: header}
        }
    }

export const LogoutAction=
 {
        type:'logout',
        payload:null

    }



export const InitAction=(token:string,user_id:number,authorized:boolean)=>
{
    return {
        type:'init',
        payload:{token:token,user_id:user_id,authorized:authorized}
    }
}


