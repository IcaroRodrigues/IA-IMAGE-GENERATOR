module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Para TS
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Integra Prettier
  ],
  rules: {
    'prettier/prettier': ['error'],
    // Aqui você pode customizar regras
    'react/react-in-jsx-scope': 'off', // se usar React 17+
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
