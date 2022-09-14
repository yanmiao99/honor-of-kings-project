const express = require('express')
const app = express()
// const routerTest = require('./routes/test.js')
// const routerTestDB = require('./routes/test-db.js')
// const routerTestToken = require('./routes/test-token.js')
const router = require('./routes/index.js')
const { port, secretKey } = require('./config/index.js')
const cors = require('cors')
const { expressjwt } = require('express-jwt')

// 配置全局中间件 ( 中间键必须配置在路由的前面, 否则不生效 )
app.use(express.json()) // 解析 json 数据
app.use(express.urlencoded({ extended: false })) // 解析 x-www-form-urlencoded 数据
app.use(cors()) // 解决跨域

// expressjwt 用来解析 token 的中间件
// .unless 用来指定什么接口不需要访问权限
app.use(expressjwt({
  credentialsRequired: true, // false：不校验
  secret: secretKey, // 加密秘钥
  algorithms: ['HS256'] // 6.0 版本以后, 必须配置
}).unless({
  path: [
    // 添加不需要token验证的路由 , 也可以使用正则
    /^\/api\/.*/
    // '/testToken/login'
  ]
}))

// 路由
// app.use('/test', routerTest)
// app.use('/test/db', routerTestDB)
// app.use('/testToken', routerTestToken)
app.use('/api', router)

// 静态资源
/*
* 注意点 : 指定存放静态资源的目录, 访问的时候不需要带有目录名称
* 例如 :  http://127.0.0.1:3000/images/bg.png
* 如果需要添加前缀, 则按照以下写法
* app.use("/public",express.static('public'))
* http://127.0.0.1:3000/public/images/bg.png
* */
app.use(express.static('public'))

// 异常捕获的中间件 ( 需要放在所有路由的最后面 )
app.use((err, req, res, next) => {
  // Token 解析失败导致错误
  if (err.name === 'UnauthorizedError') {
    return res.send({ code: 401, msg: '无效的token' })
  }

  // 其他原员导致的错误
  res.send({ code: 500, msg: '未知错误' })
})

app.listen(port, () => {
  console.log(`✅ - 当前启动的端口为 :  ${port}`)
})
