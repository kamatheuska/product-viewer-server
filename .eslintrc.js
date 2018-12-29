module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: 'standard',
    rules: {
        'strict': 0,
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parser: 'babel-eslint'
}
