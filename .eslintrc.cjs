module.export = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    // 自定义规则
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/prop-types': 0,
    'no-console': 0,
    'react/perfer-stateless-function': 0,
    'react/no-array-index-key': 0,
    'react/a11y/anchor-is-valid': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,
  },
}
