const express = require('express')
const router = express.Router()
const connection = require('../db/index.js')

// get 查询数据库的所有数据
router.get('/list', (req, res) => {
  const sql = 'SELECT * FROM user'
  connection.query(sql, (err, result) => {
    if (err) {
      res.send({
        code: 400, data: {}, msg: err
      })
      return
    }
    res.send({
      message: '查询成功', code: 200, data: result
    })
  })
})

// 条件查询

// 模糊查询
// 根据名字模糊查询
router.get('/list/:name', (req, res) => {
  // 因为在添加查询语句的时候 字符串变量默认会加上单引号
  // 所以我在这里直接用 '%'+req.query.name+'%' 包围起来
  const name = '%' + req.params.name + '%'
  // sql语句
  const sql = 'select * from user where name like ?'
  connection.query(sql, name, (err, result) => {
    // 查询成功返回的result是数组
    if (err) {
      res.send({
        code: 400, data: {}, msg: err
      })
      return
    }
    res.send({
      message: '查询成功', code: 200, data: result
    })
  })
})

// 实现增加功能
router.post('/add', (req, res) => {
  // 插入数据
  const userInfo = {
    name: req.body.name, age: req.body.age
  }
  // sql查询语句  ( id 如果是自增则默认值可以填写 null)
  const sql = 'insert into user(id,name,age) values(null,?,?)'
  // 如果添加多个数据的话，用 [] 括起来
  connection.query(sql, [userInfo.name, userInfo.age], (err, result) => {
    if (err) {
      res.send({
        code: 400, data: {}, msg: err
      })
      return
    }

    // 判断是否插入成功 , 如果插入成功了. 则会返回 1
    if (result.affectedRows === 1) {
      res.send({
        // 插入成功返回的result是对象
        message: '添加成功',
        code: 200,
        data: {
          id: result.insertId, ...userInfo
        }
      })
    } else {
      res.send({
        code: 400, data: {}, msg: '添加失败'
      })
    }
  })
})

// 新增数据很多 ( 便捷写法 )
router.post('/adds', (req, res) => {
  // 插入数据
  const userInfo = {
    name: req.body.name, age: req.body.age
  }
  // sql查询语句  ( id 如果是自增则默认值可以填写 null)
  const sql = 'insert into user set ?'
  // 如果添加多个数据的话，用 [] 括起来
  connection.query(sql, userInfo, (err, result) => {
    if (err) {
      res.send({
        code: 400, data: {}, msg: err
      })
      return
    }

    // 判断是否插入成功 , 如果插入成功了. 则会返回 1
    if (result.affectedRows === 1) {
      res.send({
        message: '添加成功',
        code: 200,
        data: {
          id: result.insertId, ...userInfo
        }
      })
    } else {
      res.send({
        code: 400, data: {}, msg: '添加失败'
      })
    }
  })
})

// 更新数据
router.post('/update/:id', (req, res) => {
  const name = req.body.name
  const id = req.params.id

  // 把id为0的name更改为测试
  const sql = 'update user set name = ? where id = ? '
  connection.query(sql, [name, id], (err, result) => {
    if (err) {
      res.send({
        data: {}, msg: err, code: 400
      })
      return
    }

    // 更新成功后, affectedRows 也会返回 1
    if (result.affectedRows === 1) {
      res.send({
        code: 200,
        msg: '更新成功',
        data: {
          id, name
        }
      })
    } else {
      res.send({
        code: 400, data: {}, msg: '更新失败'
      })
    }
  })
})

// 更新数据 (便捷方式 )
router.post('/updates/:id', (req, res) => {
  // 1. 定义接受的值
  const userInfo = {
    name: req.body.name, age: req.body.age
  }

  // 2. 定义 sql 语句
  const sql = 'update user set ? where id = ?'

  // 3. 执行方法
  connection.query(sql, [userInfo, req.params.id], (err, result) => {
    // 捕获错误
    if (err) {
      res.send({
        data: {}, msg: err, code: 400
      })
      return
    }

    // 更新成功后, affectedRows 也会返回 1
    if (result.affectedRows === 1) {
      res.send({
        // 更新成功后返回当前更新的数据
        code: 200,
        msg: '更新成功',
        data: {
          id: req.params.id, ...userInfo
        }
      })
    } else {
      res.send({
        code: 400, data: {}, msg: '更新失败'
      })
    }
  })
})

// 删除数据 (硬删除, 工作中不会用)
router.post('/delete/:id', (req, res) => {
  const id = req.params.id
  const sql = 'delete from user where id = ?'
  connection.query(sql, id, (err, result) => {
    if (err) {
      res.send({
        code: 400, data: {}, msg: err
      })
      return
    }

    // 更新成功后, affectedRows 也会返回 1
    if (result.affectedRows === 1) {
      res.send({
        // 更新成功后返回当前更新的数据
        message: '删除成功', code: 200, data: {}
      })
    } else {
      res.send({
        code: 400, data: {}, msg: '删除失败'
      })
    }
  })
})

// 删除数据 ( 软删除, 工作中常用 )

router.post('/deleteItem/:id', (req, res) => {
  const id = req.params.id

  const sql = 'update user set isDelete = 1 where = ?'

  connection.query(sql, id, (err, result) => {
    if (err) {
      res.send({
        code: 400, data: {}, msg: err
      })
      return
    }

    // 更新成功后, affectedRows 也会返回 1
    if (result.affectedRows === 1) {
      res.send({
        // 更新成功后返回当前更新的数据
        message: '删除成功', code: 200, data: {}
      })
    } else {
      res.send({
        code: 400, data: {}, msg: '删除失败'
      })
    }
  })
})

module.exports = router
