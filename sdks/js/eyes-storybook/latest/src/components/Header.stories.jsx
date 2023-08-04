import React from 'react';

import {Header} from './Header';

export default {
    title: 'Header',
    component: Header,
    parameters: {
        eyes: {
            ignoreRegions: [
                {selector: '.ignore-this'}, // by css selector
            ]
        }
    }
};

export const LoggedIn = {
    args: {
        user:{}
    }

};

export const LoggedOut = {
    args: {}
}
