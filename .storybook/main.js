module.exports = {
  stories: ['../stories/**/*.stories.@(js|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
