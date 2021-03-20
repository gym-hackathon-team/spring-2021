import React from 'react';

interface NewHeaderProps
{
    stream:string
}

export function NewHeader(props:NewHeaderProps)
{


    return <div className={'NewHeader'}><p>{props.stream}</p></div> ;
}
export default NewHeader;
