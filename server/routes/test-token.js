const express = require('express')
const router = express.Router()
const { secretKey } = require('../config')
const connection = require('../db/index.js')

// 路由鉴权
// 1. 导入用于生产 JWT 字符串的包
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')

// 2. 导入用于将客户端发送回来的 JWT 字符串还原 JSON 对象的包
// const expressJWT = require('express-jwt')

// 3. 编写登陆接口
router.post('/login', (req, res) => {
  // 1. 获取用户名和密码
  const userInfo = {
    name: req.body.name, password: req.body.password
  }

  // 2. 查询数据库, 是否正确
  const sql = 'select * from user where name = ? and password = ?'

  connection.query(sql, [userInfo.name, userInfo.password], (err, result) => {
    if (err) {
      res.send({
        code: 400, msg: '登陆失败', data: err
      })
      return
    }

    // 3. 登陆成功, 生成token
    /**
         * sign 签名参数说明 :
         * 参数一 : 用户信息对象 , 这里携带的信息 , 可以在需要鉴权才能访问的接口中使用 req.auth 获取
         * 参数二 : secretKey , 加密的秘钥
         * 参数三 : options , 额外的配置信息, 一般会输入过期时间  expiresIn
         */
    const token = jwt.sign({
      name: result.name,
      age: result.age
    }, secretKey, { expiresIn: '1h' })

    // 4. 返回信息给客户端

    res.send({
      code: 200,
      msg: '登陆成功',
      data: {
        id: result[0].id, name: result[0].name, age: result[0].age, token: 'Bearer ' + token
      }
    })
  })
})

// 4. 定义局部中间件验证鉴权
router.use(expressjwt({
  credentialsRequired: true, // false：不校验
  secret: secretKey, // 加密秘钥
  algorithms: ['HS256'] // 6.0 版本以后, 必须配置
}).unless({
  path: [
    // 添加不需要token验证的路由 , 也可以使用正则
    /^\/test\/.*/,
    '/testToken/login'
  ]
}))

// 5. 测试token
router.get('/getInfo', (req, res) => {
  console.log(req.auth)
  res.send({
    code: 200,
    msg: '获取用户信息成功',
    data: req.auth
  })
})

// 6. 捕获鉴权错误或者token 过期
router.use((err, req, res, next) => {
  // Token 解析失败导致错误
  if (err.name === 'UnauthorizedError') {
    return res.send({ code: 401, msg: '无效的token' })
  }

  // 其他原员导致的错误
  res.send({ code: 500, msg: '未知错误' })
})

module.exports = router
