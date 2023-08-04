import React from 'react';

import {Button} from './Button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
};

export const Primary = {
    args: {
        primary: true,
        label: 'Button',
    },
    story: {
        name: 'The most default button'
    }
}


export const Secondary = {
    args: {
        label: 'Button',
    }
}


export const Large = {
    args: {
        size: 'large',
        label: 'Button',
    }
}


export const Small = {
    args: {
        size: 'small',
        label: 'Button',
    }
}

