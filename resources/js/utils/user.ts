import * as Cookies from "js-cookie";
import i18next from "i18next";
import {store } from '../index'

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

export function setUserData()
{

    const data=store.getState();
    if (data.id==0 || data.token==='')
    {
        Cookies.remove('access_token');
        Cookies.remove('user_id');
    }
    else
    {
        Cookies.set('access_token',data.token);
        Cookies.set('user_id',String(data.id));
    }

}
