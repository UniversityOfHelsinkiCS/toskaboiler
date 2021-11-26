module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': 'warn',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
    'eslintreact/jsx-props-no-spreading': 'off',
    'react/prop-types': [
      1,
      {
        skipUndeclared: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['draft', 'state'] },
    ],
  },
}
