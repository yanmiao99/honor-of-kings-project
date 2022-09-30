module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const con = require('../../db/index')

  // 创建分类
  router.post('/categories/add', async (req, res) => {
    const name = req.body.name

    // 判断是否已经有同名分类 , 并且需要判断不是删除状态的
    const selectSql = 'select * from categories where name = ? and isDelete = 0'
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
    // ?pageNum=1&pageSize=10

    const pageSize = Number(req.query.pageSize) || 10 // 查询多少条 (默认查询10条)
    const pageNum = Number(req.query.pageNum) || 1 // 查询第几页 (默认第一页)

    const start = (pageNum - 1) * pageSize

    const sql = 'select * from categories where isDelete != 1 limit ?, ?'
    const sqlCount = 'select count(*) from categories where isDelete != 1'

    // eslint-disable-next-line no-unused-vars
    let count
    // eslint-disable-next-line n/handle-callback-err
    await con.query(sqlCount, (err, result) => {
      // 得到总记录数
      count = result[0]['count(*)']
    })

    await con.query(sql, [start, pageSize], (err, data) => {
      if (err) {
        res.send({
          code: 400, msg: '数据查询失败', data: {}
        })
        return err
      }
      res.send({
        code: 200,
        msg: '数据查询成功',
        data: {
          list: [
            ...data
          ],
          pageNum,
          pageSize,
          count
        }
      })
    })
  })

  app.use('/admin/api', router)
}
