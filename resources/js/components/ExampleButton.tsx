import React from 'react';
import { DefaultButton } from '@fluentui/react';

const ExampleButton = () => {
    return (
        <DefaultButton
            onClick={() => alert("hello")}
        >
            Hello World
        </DefaultButton>
    );
};

export default ExampleButton;
