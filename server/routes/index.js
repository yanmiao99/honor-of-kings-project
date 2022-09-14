const express = require('express')
const router = express.Router()
// const connection = require('../db/index.js')

// 测试接口
router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router
