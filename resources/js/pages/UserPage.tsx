import React, {useEffect, useState} from "react";
import {DefaultButton, DefaultEffects, Icon, TextField} from "@fluentui/react";
import {getUserInfo, log_out, UserInfoUpdate} from "../utils/user";
import Alert from "../components/Alert";
import {HeaderAction} from "../actions/user";
import {connect} from "react-redux";
const LogOutIcon = () => <Icon iconName="SignOut"/>;

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
    t: any,
    state: any,
    dispatch: any
}

class UserPage extends React.Component<UserPageProps, UserState> {
    constructor(props: UserPageProps) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(HeaderAction('Account'));
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
        return <div className={'user_page'} >
            {
                this.state &&
                <>

                    <div className={'user1_text_field'}>
                        <TextField  label={this.props.t('AuthForm.textFieldEmail')}
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
                    <div className={'user1_text_field'}>
                        <TextField  label={this.props.t('AuthForm.textFieldName')}
                                   value={this.state.name == null ? '' : this.state.name}
                                   onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                       ...this.state,
                                       name: newValue
                                   })}/>
                    </div>
                    <div className={'user1_text_field'}>
                        <TextField canRevealPassword placeholder={'*****'} label={this.props.t("AuthForm.textFieldPassword")} type={'password'}
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
                    <div className={'user1_text_field'}>
                        <TextField canRevealPassword  placeholder={'*****'} label={this.props.t('AuthForm.textFieldConfirmPassword')} type={'password'}
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
                        style={{width:'100%',background:"#16B5E8"}}
                        primary
                        disabled={!regEmail.test(this.state.email) || String(this.state.password).length > 0 && String(this.state.password).length < 6 || this.state.password !== this.state.confirm_password}
                        onClick={() => {

                            let updateData = {id: this.state.id, name: this.state.name, email: this.state.email};
                            if (this.state.password.length >= 6 && this.state.password.length <= 20 && this.state.password === this.state.confirm_password) {
                                // @ts-ignore
                                updateData = {...updateData, password: this.state.password,password_confirmation:this.state.confirm_password};
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
                    <div style={{margin:"1% auto"}}>
                    <DefaultButton onClick={()=>{
                        log_out().then()
                    }}><LogOutIcon/></DefaultButton>
                    </div>
                    <div className={'alert_message'}>
                        {this.state.alert.message.length > 0 &&
                        <Alert type={this.state.alert.type} afterClose={afterAlertClose}
                               message={this.state.alert.message}/>
                        }
                    </div>
                </>
            }


        </div>
    }
}

const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);
