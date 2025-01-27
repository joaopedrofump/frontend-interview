module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks'
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { 'extensions': ['.tsx'] }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        'allowExpressions': true
      }
    ],
    'max-len': ['warn', { 'code': 100 }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'comma-dangle': 'off',
    'react/jsx-indent': ["error", 2],
    'object-curly-newline': 'off',
    'quotes': 'off',
    'no-plusplus': 'off',
    'no-debugger': 'off',
    'no-mixed-operators': 'off',
    'react/require-default-props': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'no-continue': 'off',
    'react/no-array-index-key': 'off'
    //  '@typescript-eslint/explicit-function-return-type':'off'
  },
  settings: {
    'import/resolver': {
      'typescript': {}
    },
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never',
        'tsx': 'never'
      }
    ]
  }
};