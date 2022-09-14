const mysql = require('mysql')
const { db } = require('../config/index.js')

const connection = mysql.createConnection(db)

connection.connect(function (err) {
  if (err) {
    // 链接失败
    console.log('❌ Error connection' + err.stack)
    return
  }
  // 数据库链接成功
  console.log('✅ - 数据库连接成功 ')
})

module.exports = connection
