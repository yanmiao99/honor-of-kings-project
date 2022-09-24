module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const con = require('../../db/index')

  // 创建分类
  router.post('/categories/add', async (req, res) => {
    const name = req.body.name

    // 判断是否已经有同名分类
    const selectSql = `select *
                           from categories
                           where name = ?
                             and isDelete = 0`
    await con.query(selectSql, name, async (err, data) => {
      if (err) {
        return err
      }
      if (data.length >= 1) {
        res.send({
          code: 400, msg: '已经存在同名分类', data: {}
        })
      } else {
        // 没有同名分类则开始创建
        const insertSql = 'insert into categories set ?'
        await con.query(insertSql, { name }, (err, data) => {
          if (err) {
            return err
          }
          if (data.affectedRows === 1) {
            res.send({
              code: 200, msg: '数据添加成功', data: {}
            })
          } else {
            res.send({
              code: 400, msg: '数据添加失败', data: {}
            })
          }
        })
      }
    })
  })

  // 查询分类
  router.get('/categories/list', async (req, res) => {
    const sql = 'select * from categories where isDelete != 1'
    await con.query(sql, (err, data) => {
      if (err) {
        res.send({
          code: 400, msg: '数据查询失败', data: {}
        })
        return err
      }
      res.send({
        code: 200, msg: '数据查询成功', data
      })
    })
  })

  app.use('/admin/api', router)
}
