import React from 'react';

import {Page} from './Page';
import * as HeaderStories from './Header.stories';

export default {
    title: 'Page',
    component: Page,
    parameters: HeaderStories.default.parameters
};

export const LoggedIn = {
    args: {
        ...HeaderStories.LoggedIn.args,
    }
};

export const LoggedOut = {
    args: {
        ...HeaderStories.LoggedOut.args,
    }
}