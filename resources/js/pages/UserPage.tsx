import React, {useEffect, useState} from "react";
import {DefaultButton, DefaultEffects, TextField} from "@fluentui/react";
import {getUserInfo, UserInfoUpdate} from "../utils/user";
import Alert from "../components/Alert";
//import i18n from "../locales/i18n";
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
    password: string,
    confirm_password: string,
    alert: { type: string, message: string }

}

interface UserPageProps {
    t: any
}

class UserPage extends React.Component<UserPageProps, UserState> {
    constructor(props: UserPageProps) {
        super(props)
    }

    componentDidMount() {
        getUserInfo().then(value => {
            this.setState({...value.result, password: '', confirm_password: '', alert: {message:'',type:'default'}});
        });
    }


    render() {

        const SetAlert = (alert: { message: string, type: string }) => {
            this.setState({
                ...this.state,
                alert: alert
            })
        }
        const afterAlertClose = () => SetAlert({type: 'default', message: ''});
        const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        const showErrorAlert = (text: string) => {
            SetAlert({type: 'error', message: text})
        };
        const showWarningAlert = (text: string) => {
            SetAlert({type: 'warning', message: text})
        };
        const showSuccessAlert = (text: string) => {
            SetAlert({type: 'success', message: text})
        };
        const showDefaultAlert = (text: string) => {
            SetAlert({type: 'default', message: text})
        };

        const getPasswordErrorMessage = (value: string): string => {

            return value.length >= 6 && value.length <= 20 || value === '' ? '' : this.props.t('AuthForm.incorrectPassword');
        };
        return <div style={{boxShadow: DefaultEffects.elevation8}} className={'UserInfo'} >
            {
                this.state &&
                <>
                    <div className={'alert_message'}>
                        {this.state.alert.message.length > 0 &&
                        <Alert type={this.state.alert.type} afterClose={afterAlertClose}
                               message={this.state.alert.message}/>
                        }
                    </div>
                    <div className={'user_text_field'}>
                        <TextField label={this.props.t('AuthForm.textFieldEmail')}
                                   value={this.state.email == null ? '' : this.state.email}
                                   onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                       ...this.state,
                                       email: newValue
                                   })}
                                   onGetErrorMessage={(value) => {
                                       return regEmail.test(value) ? '' : this.props.t('AuthForm.incorrectEmail')
                                   }}
                        />
                    </div>
                    <div className={'user_text_field'}>
                        <TextField label={this.props.t('AuthForm.textFieldName')}
                                   value={this.state.name == null ? '' : this.state.name}
                                   onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                       ...this.state,
                                       name: newValue
                                   })}/>
                    </div>
                    <div className={'user_text_field'}>
                        <TextField label={this.props.t("AuthForm.textFieldPassword")} type={'password'}
                                   value={this.state.password} onGetErrorMessage={getPasswordErrorMessage}
                                   onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                       if (String(newValue).length <= 20) {
                                           this.setState({
                                               ...this.state,
                                               password: String(newValue)
                                           })
                                       }
                                   }
                                   }/>
                    </div>
                    <div className={'user_text_field'}>
                        <TextField label={this.props.t('AuthForm.textFieldConfirmPassword')} type={'password'}
                                   value={this.state.confirm_password} onGetErrorMessage={getPasswordErrorMessage}
                                   onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                       if (String(newValue).length <= 20) {
                                           this.setState({
                                               ...this.state,
                                               confirm_password: String(newValue)
                                           })
                                       }
                                   }}/>

                    </div>
                    <DefaultButton
                        disabled={!regEmail.test(this.state.email) || String(this.state.password).length > 0 && String(this.state.password).length < 6 || this.state.password !== this.state.confirm_password}
                        onClick={() => {

                            let updateData = {id: this.state.id, name: this.state.name, email: this.state.email};
                            if (this.state.password.length >= 6 && this.state.password.length <= 20 && this.state.password === this.state.confirm_password) {
                                // @ts-ignore
                                updateData = {...updateData, password: this.state.password};
                            }
                            console.log(updateData);

                            UserInfoUpdate(updateData).then(value => {
                                console.log(value);
                                if (value)
                                {
                                    showSuccessAlert(this.props.t('UserPage.SuccessUpdateAlert'))
                                }
                                else
                                {
                                    showErrorAlert(this.props.t('AuthForm.errorMes'));
                                }
                                this.setState({...this.state, password: '', confirm_password: ''});
                            });


                        }}>{this.props.t('UserPage.UpdateButton')}</DefaultButton>
                </>
            }


        </div>
    }
}

export default UserPage;
