import React from 'react';

import { Page } from './Page';
import * as HeaderStories from './Header.stories';

export default {
  title: 'Page',
  component: Page,
  parameters: HeaderStories.default.parameters
};

const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
