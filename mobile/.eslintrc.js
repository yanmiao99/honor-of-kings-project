module.exports = {
  env: {
    browser: true, es2021: true, node: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest', sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    indent: [2, 2], // 缩进2个空格
    semi: [2, 'never'], // 要求或禁止使用分号代替 ASI,即禁用行尾使用分号
    quotes: [2, 'single'], // 使用单引号
    'no-mixed-spaces-and-tabs': [2], // 禁止空格和 tab 的混合缩进
    'no-extra-semi': [2], // 禁止不必要的分号
    'no-undef': 'off', // 关闭未定义的检查
    'comma-dangle': [2, 'never'], // 禁止末尾逗号
    'no-var': 2, // 禁用var，用let和const代替
    'no-extra-parens': 2, // 禁止非必要的括号
    'vue/multi-word-component-names': 0
  }
}
