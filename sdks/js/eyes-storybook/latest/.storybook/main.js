module.exports = {
  stories: ['../src/**/*.stories.jsx'],
  // stories: [],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      defaultName: 'Make the name for the story'
    }
  },
  addons: [`@storybook/preset-create-react-app`],
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  }
};