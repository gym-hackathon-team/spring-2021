import React, {useEffect, useState} from "react";
import {DefaultButton, DefaultEffects, TextField} from "@fluentui/react";
import {getUserInfo, UserInfoUpdate} from "../utils/user";
import i18n from "../locales/i18n";
/*
bio: null
birth_day: null
created_at: "2021-03-18T03:48:01.000000Z"
deleted_at: null
email: "amaso2001@gmail.com"
email_verified: true
id: 19
name: "Алекс"
sex: "not selected"
updated_at: "2021-03-19T14:15:54.000000Z"
 */

/*
export function UserPage() {
    const [userInfo, setInfo] = useState({} as any);


    return <div style={{boxShadow: DefaultEffects.elevation8}} className={'UserInfo'}>
        {
            userInfo != {} &&
            <>
                <TextField label="bio" value={userInfo.bio}/>

                <TextField label="birth_day" value={String(userInfo.birth_day)}/>
                <TextField label="created_at" value={String(userInfo.created_at)}/>
                <TextField label="deleted_at" value={String(userInfo.deleted_at)}/>
                <TextField label="email" value={String(userInfo.email)}/>
                <TextField label="name" value={String(userInfo.name)}/>

                <TextField label="sex" value={String(userInfo.sex)}/>
                <DefaultButton onClick={() => {

                    getUserInfo().then(value => {
                        setInfo(value.result);
                    });

                }
                }
                />
            </>
        }


    </div>

}
*/

interface UserState {
    bio: any
    birth_day: any
    created_at: any
    deleted_at: any
    email: any
    email_verified: any
    id: any
    name: any
    sex: any
    updated_at: any,
    password: string | undefined,
    confirm_password: string | undefined

}

class UserPage extends React.Component<{}, UserState> {


    componentDidMount() {
        getUserInfo().then(value => {
            this.setState({...value.result, password: '', confirm_password: ''});
        });
    }

    render() {
        const getPasswordErrorMessage = (value: string): string => {

            return value.length >= 6 && value.length <= 20 || value === '' ? '' : i18n.t('AuthForm.incorrectPassword');
        };
        return <div style={{boxShadow: DefaultEffects.elevation8}} className={'UserInfo'}>
            {
                this.state &&
                <>


                    <TextField label="email" value={this.state.email == null ? '' : this.state.email}
                               onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                   ...this.state,
                                   email: newValue
                               })}/>
                    <TextField label="name" value={this.state.name == null ? '' : this.state.name}
                               onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                   ...this.state,
                                   name: newValue
                               })}/>
                    <TextField label="password" type={'password'} value={this.state.password} onGetErrorMessage={getPasswordErrorMessage}
                               onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                   if (String(newValue).length <= 20) {
                                       this.setState({
                                           ...this.state,
                                           password: newValue
                                       })
                                   }
                               }
                               }/>

                    <TextField label="confirm password" type={'password'} value={this.state.confirm_password} onGetErrorMessage={getPasswordErrorMessage}
                               onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                   if (String(newValue).length <= 20) {
                                       this.setState({
                                           ...this.state,
                                           confirm_password: newValue
                                       })
                                   }
                               }}/>


                    <DefaultButton
                        disabled={String(this.state.password).length > 0 && String(this.state.password).length < 6 || this.state.password !== this.state.confirm_password}
                        onClick={() => {

                            let updateData = this.state;
                            if (String(this.state.password).length >= 6 && String(this.state.password).length <= 20 && this.state.password === this.state.confirm_password) {
                                updateData = {...updateData, password: this.state.password};
                            }
                            console.log(updateData);
                            UserInfoUpdate(updateData).then(value => {
                                console.log(value);
                                this.setState({...this.state, password: '', confirm_password: ""});
                            });

                        }}>UPDATE</DefaultButton>
                </>
            }


        </div>
    }
}

export default UserPage;
