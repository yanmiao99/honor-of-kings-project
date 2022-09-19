module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const con = require('../../db/index')

  router.post('/categories/add', async (req, res) => {
    const name = req.body.name
    const sql = 'INSERT INTO categories SET ?'
    // 1.数据库中插入数据
    await con.query(sql, { name }, (err, data) => {
      if (err) {
        return err
      }
      if (data.affectedRows === 1) {
        res.send({
          code: 200,
          msg: '数据添加成功',
          data: {}
        })
      }
    })
  })

  app.use('/admin/api', router)
}
