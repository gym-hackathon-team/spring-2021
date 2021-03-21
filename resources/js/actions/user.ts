const actions = [
    {type: 'login'},
    {type: 'logout'},
    {type: 'check_auth'},
    {type: 'init'},
    {type: 'header'},
    {type: 'start_stream'},
    {type: 'stop_stream'},

]

export const LoginAction = (token: string, user_id: number) => {
    return {
        type: 'login',
        payload: {token: token, user_id: user_id}
    }
}

export const startStreamAction = (id: any, stream: any) => {
    const action = {
        type: 'start_stream',
        payload: {id: id, stream: stream}
    };
    return action;


}

export const HeaderAction = (header: string) => {
    return {
        type: 'header',
        payload: {header: header}
    }
}

export const LogoutAction =
    {
        type: 'logout',
        payload: null

    }

    export const stopAction={
        type: 'stop_stream',
        payload: {id: 0, stream: null}
    }

export const InitAction = (token: string, user_id: number, authorized: boolean) => {
    return {
        type: 'init',
        payload: {token: token, user_id: user_id, authorized: authorized}
    }
}


