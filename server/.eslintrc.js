module.exports = {
  root: true,
  env: {
    commonjs: false,
    es2021: false,
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
    quotes: [2, 'single'], // 使用单引号
    'block-spacing': [2, 'always'], // 禁止或强制在单行代码块中使用空格
    curly: [2, 'multi-line'], // 强制所有控制语句使用一致的括号风格
    // 强制object.key 中 . 的位置，参数:
    // property，'.'号应与属性在同一行
    // object, '.' 号应与对象名在同一行
    'dot-location': [2, 'property']

  }
}
