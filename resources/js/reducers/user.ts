const InitialUserState = {id: 0, token: '', authorized: false,init:false,header:'',stream: {id:0,stream:null}};
import Redux from 'redux';

interface UserAction
{
    type:string,
    payload:any
}

export function userAuthReducer(state = InitialUserState, action: UserAction) {

    if (action.type === 'login') {
        // If so, make a copy of `state`
        return {
            ...state,
            authorized: true,
            id: action.payload.user_id,
            token: action.payload.token

        }
    }
    if (action.type === 'check_auth') {
        // If so, make a copy of `state`
        return {
            ...state,
            checkAuth: true
        }
    }

    if (action.type === 'logout') {
        // If so, make a copy of `state`
        return {
            ...state,
            authorized: false,
            id: 0,
            token: ''
        }
    }
    if (action.type === 'init') {
        // If so, make a copy of `state`
        return {
            ...state,
            init:true,
            authorized: action.payload.authorized,
            id: action.payload.user_id,
            token: action.payload.token
        }
    }

    if (action.type === 'header') {
        // If so, make a copy of `state`
        return {
            ...state,

            header: action.payload.header
        }
    }

    if (action.type === 'start_stream') {
        // If so, make a copy of `state`
        return {
            ...state,

            stream: action.payload
        }
    }

    if (action.type === 'stop_stream') {
        // If so, make a copy of `state`
        return {
            ...state,

            stream: action.payload
        }
    }

    return state
}
