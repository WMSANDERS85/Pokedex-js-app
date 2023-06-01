module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off',
    quotes: ['error', 'single'],

    'no-use-before-define': 'off',

    'no-trailing-spaces': 'off',
  },
};
