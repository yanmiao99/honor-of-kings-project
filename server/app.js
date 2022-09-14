const express = require('express')
const app = express()
const router = require('./routes/index.js')
const { port } = require('./config/index.js')
const cors = require('cors')

// 配置全局中间件 ( 中间键必须配置在路由的前面, 否则不生效 )
app.use(express.json()) // 解析 json 数据
app.use(express.urlencoded({ extended: false })) // 解析 x-www-form-urlencoded 数据
app.use(cors()) // 解决跨域

// 路由
app.use('/api', router)

app.listen(port, () => {
  console.log(`✅ - 当前启动的端口为 :  ${port}`)
})
