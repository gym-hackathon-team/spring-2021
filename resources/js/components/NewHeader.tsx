import React from 'react';
import {connect} from "react-redux";

interface NewHeaderProps
{
    state: any,
    dispatch: any
}

export function NewHeader(props:NewHeaderProps)
{


    return <div className={'NewHeader'}><p>{props.state.header}</p></div> ;
}

const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewHeader);
