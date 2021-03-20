import * as Cookies from "js-cookie";
import i18next from "i18next";
import {store} from '../index'
import {LoginAction, LogoutAction} from "../actions/user";


export function readUserData() {
    const token = Cookies.get('access_token');
    const user_id = Cookies.get('user_id');
    if (token == null || user_id == null) {
        return {id: 0, token: ''}
    } else {
        return {id: Number(user_id), token: token}
    }
}

export async function checkUserAuth(token: string, user_id: number) {

    let response = await fetch(`/api/user/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Language': i18next.language

        },

    });

    return response.ok;

}

export function setUserData() {

    const data = store.getState();
    if (data.id == 0 || data.token === '') {
        Cookies.remove('access_token');
        Cookies.remove('user_id');
    } else {
        Cookies.set('access_token', data.token);
        Cookies.set('user_id', String(data.id));
    }

}

export async function sign_in(email: string, password: string) {
    let data = {
        email: email, password: password
    };


    let response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': i18next.language
        },
        body: JSON.stringify(data),
    });
    if (response.status == 200) {
        let result = await response.json();
        console.log(result);
        store.dispatch(LoginAction(result.access_token, result.id));

        return {auth: true, message: result.message};
    } else {
        let result = await response.json();
        console.log("error: " + response.status);
        return {auth: false, message: result.message};
    }
}

export async function register(email: string, password: string, name: string) {
    let data = {
        email: email, password_confirmation: password, password: password, name: name
    };
    let response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': i18next.language
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {

        return true;
    } else {

        return false;
    }
}


export async function log_out() {
    const token = Cookies.get('access_token');

    let response = await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },

    });
    if (response.ok) {

        store.dispatch(LogoutAction);
        return true;
    } else {
        console.log("error: " + response.status);
        return false;
    }
}

export async function sendEmail(email: string) {

    let data = {
        email: email
    };
    let response = await fetch('/api/password/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': i18next.language
        },
        body: JSON.stringify(data),
    });
    if (response.status == 200) {
        let result = await response.json();

        return {status: 'success', message: result.message};
    } else {
        let result = await response.json();

        return {status: 'error', message: result.message};
    }
}

export async function validate(email: string, token: string) {

    const data = {email: email, code: token}
    let response = await fetch(`/api/password/validate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': i18next.language

        },
        body: JSON.stringify(data),

    });
    if (response.status == 200) {
        let result = await response.json();

        return {status: 'success', result: result.message};
    } else {
        return {status: 'error'};
    }
}

export async function resetPassword(email: string, password: string, token: string) {

    let data = {
        email: email,
        password: password,
        password_confirmation: password,
        token: token
    };
    let response = await fetch('/api/password/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': i18next.language

        },
        body: JSON.stringify(data),
    });
    if (response.status == 200) {
        let result = await response.json();

        return {status: 'success', message: result.message};
    } else {
        let result = await response.json();

        return {status: 'error', message: result.message};
    }
}

export async function checkAuth() {


    const token = Cookies.get('access_token');
    const user_id = Cookies.get('user_id');
    if (token == null || user_id == null) {
        return false;
    }
    let response = await fetch(`/api/user/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Language': i18next.language

        },

    });
    if (!response.ok) {
        Cookies.remove('access_token');
        Cookies.remove('user_id');
    }
    return response.ok;
}

export async function getUserInfo(id = store.getState().id) {
    let response = await fetch(`/api/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${store.getState().token}`,
            'Accept': 'application/json',
            'Content-Language': i18next.language

        },

    });
    if (response.ok) {
        const result = await response.json();
        return {success: true, result: result}
    }
    return {success: false}

}

export async function UserInfoUpdate(userInfo:any) {
    let response = await fetch(`/api/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${store.getState().token}`,
            'Accept': 'application/json',
            'Content-Language': i18next.language

        },
        body:JSON.stringify(userInfo)

    });
    return response.ok;


}
