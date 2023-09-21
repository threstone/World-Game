module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2016,
        sourceType: 'module'
    },
    rules: {
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        // 关闭console提示( Unexpected console statement)
        'no-console': 'off',
        // 关闭定义了，但没调用(** is defind but never used)
        // "no-unused-vars": "off",
        // eslint-disable-next-line no-dupe-keys
        'linebreak-style': ['off', 'windows'],
        'semi': [2, 'always'],//语句强制分号结尾
        'no-unused-vars': 0,
        'no-multi-spaces': 0,
    },
    exclude: [
        "./test/"
    ]
};