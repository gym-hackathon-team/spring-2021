import React, {useEffect, useState} from "react";
import {DefaultButton, DefaultEffects, TextField} from "@fluentui/react";
import {getUserInfo, UserInfoUpdate} from "../utils/user";

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
    updated_at: any

}

class UserPage extends React.Component<{}, UserState> {

    componentDidMount() {
        getUserInfo().then(value => {
            this.setState(value.result);
        });
    }

    render() {
        return <div style={{boxShadow: DefaultEffects.elevation8}} className={'UserInfo'}>
            {
                this.state &&
                <>
                    <TextField label="bio" value={this.state.bio == null ? '' : this.state.bio}
                               onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                   ...this.state,
                                   bio: newValue
                               })}/>

                    <TextField label="birth_day" multiline
                               value={this.state.birth_day == null ? '' : new Date(this.state.birth_day).toString()}
                               onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                   ...this.state,
                                   birth_day: newValue
                               })}/>
                    <TextField label="created_at" multiline
                               value={this.state.created_at == null ? '' : new Date(this.state.created_at).toString()}
                               readOnly/>
                    <TextField label="deleted_at" multiline
                               value={this.state.deleted_at == null ? '' : new Date(this.state.deleted_at).toString()}
                               readOnly/>
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

                    <TextField label="sex" value={this.state.sex == null ? '' : this.state.sex}
                               onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                   ...this.state,
                                   sex: newValue
                               })}/>
                    <DefaultButton onClick={() => {
                        UserInfoUpdate(this.state).then(value => {
                            console.log(value)
                        });

                    }}>UPDATE</DefaultButton>
                </>
            }


        </div>
    }
}

export default UserPage;
