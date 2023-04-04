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

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
