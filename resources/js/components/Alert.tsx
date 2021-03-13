import {MessageBar, MessageBarType} from "office-ui-fabric-react";
import React from "react";


export interface AlertProps {
    afterClose: () => void,
    message: string,
    type : string,
}

export const Alert = (p: AlertProps) => {


    let mes_type;
    switch(p.type)
    {
        case 'success':
            mes_type=MessageBarType.success;
            break;
        case 'error':
            mes_type=MessageBarType.error;
            break;
        case 'warning':
            mes_type=MessageBarType.warning;
            break;

    }
    return (
        <MessageBar
            messageBarType={mes_type}
            isMultiline={false}
            onDismiss={p.afterClose}
            dismissButtonAriaLabel="Close"
        >{p.message}
        </MessageBar>
    );
};
export default Alert;
