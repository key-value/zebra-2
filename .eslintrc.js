module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'typescript-eslint-parser'
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'eslint-config-alloy/typescript',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier',
    'typescript'
  ],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    'eqeqeq': [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
  }
}
