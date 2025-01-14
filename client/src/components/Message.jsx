import React from 'react';
import { Alert , AlertTitle } from '@material-ui/lab';

export default function Message(props){

    
    const msgDisp = (t) => (<Alert severity={t}>{props.message.msgBody}</Alert>) ;

    return (
        <>
        {props.message.msgError ? msgDisp("error") : msgDisp("success")}
        </>
    )
}

//<Alert severity="error">{props.message.msgBody}</Alert>