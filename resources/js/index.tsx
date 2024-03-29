import React from "react";
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import App from "./App";
import './locales/i18n';
import {initializeIcons} from '@uifabric/icons';
import {checkUserAuth, readUserData, setUserData} from "./utils/user";
import {userAuthReducer} from "./reducers/user";
import {Provider} from "react-redux";
import {InitAction} from "./actions/user";
import Echo from "laravel-echo"

initializeIcons();


export const store = createStore(userAuthReducer);


store.subscribe(setUserData);


const userData = readUserData();
console.log(userData);
if (userData.token === '' || userData.id == 0) {
    store.dispatch(InitAction(userData.token, userData.id, false));
} else {
    checkUserAuth(userData.token, userData.id).then(value => {
        if (value) {
            store.dispatch(InitAction(userData.token, userData.id, true));
        } else {
            store.dispatch(InitAction('', 0, false));
        }


    })
}






// TODO Disable StrictMode
ReactDOM.render(<React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
</React.StrictMode>, document.getElementById('root'));


