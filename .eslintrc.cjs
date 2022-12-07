module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    Promise: 'readonly'
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'next'
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  rules: {
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],

    '@typescript-eslint/triple-slash-reference': [
      'warn',
      { path: 'always', types: 'always', lib: 'always' }
    ],
    'multiline-ternary': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false }
    ],
    indent: 'off',
    '@typescript-eslint/indent': 'off'
  },
  parser: '@typescript-eslint/parser',

  plugins: ['react', '@typescript-eslint']
}
