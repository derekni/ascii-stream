module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier/@typescript-eslint',
  ],
  globals: {
    React: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react'],
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': 'error',
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }], // allows single and double quotes
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ], // sorts multiple members
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
