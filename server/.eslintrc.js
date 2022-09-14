module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  globals: {},
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: [2, 'never'], // 要求或禁止使用分号代替 ASI,即禁用行尾使用分号
    quotes: [2, 'single'] // 使用单引号
  }
}
