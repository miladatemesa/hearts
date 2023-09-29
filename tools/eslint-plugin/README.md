## Description

Eslint plugin for check export name and kebab case file name.

## Installation

```bash
yarn add --dev @amoo-milad/eslint-plugin
```
or
```bash
npm install --save-dev @amoo-milad/eslint-plugin
```

## Usage

```js
// .eslintrc.js
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    extends: [
        'plugin:@amoo-milad/eslint-plugin/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
};
```
