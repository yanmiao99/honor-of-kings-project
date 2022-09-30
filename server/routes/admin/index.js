const con = require('../../db')
module.exports = app => {
  const con = require('../../db/index')
  const express = require('express')
  const router = express.Router()

  /**
     * 创建分类
     * @param {string} name 必选 分类名称
     */
  router.post('/add', async (req, res) => {
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

  /**
     * 分类列表
     * @param {number} pageNum 可选 当前页码 , 默认 1 条
     * @param {number} pageSize 可选 返回数据条目 , 默认 10 条
     */
  router.get('/list', async (req, res) => {
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

  /**
     * 删除单条数据
     * @param {number} id 必选 分类id
     */
  router.post('/delete', async (req, res) => {
    // 1.获取id
    const id = Number(req.body.id)
    // 2. 修改数据库中的id 对应的 isDelete 状态为1
    const sql = 'update categories set isDelete = 1 where id = ? and isDelete != 1'

    // 3. 调用数据库修改方法
    con.query(sql, id, (err, data) => {
      if (err) {
        res.send({
          code: 400,
          msg: '所删除的对应数据不存在',
          data: {}
        })
        return err
      }

      // 删除成功
      if (data.affectedRows === 1) {
        res.send({
          code: 200,
          msg: '删除成功',
          data: {}
        })
      } else {
        res.send({
          code: 400,
          msg: '删除失败',
          data: {}
        })
      }
    })
  })

  /**
     * 模糊搜索 🔍
     * @param {string} key 需要搜索的关键词
     * @param {number} pageNum 可选 当前页码 , 默认 1 条
     * @param {number} pageSize 可选 返回数据条目 , 默认 10 条
     */
  router.get('/search', async (req, res) => {
    // 关键词
    const key = '%%' + req.query.key + '%%'
    // 搜索语句
    const pageSize = Number(req.query.pageSize) || 10 // 查询多少条 (默认查询10条)
    const pageNum = Number(req.query.pageNum) || 1 // 查询第几页 (默认第一页)

    const start = (pageNum - 1) * pageSize

    const sql = 'select * from categories where name like ? and isDelete != 1 limit ?,?'

    // 获取总数
    const sqlCount = 'select count(*) from categories where name like ? and isDelete != 1'

    // eslint-disable-next-line no-unused-vars
    let count
    // eslint-disable-next-line n/handle-callback-err
    await con.query(sqlCount, key, (err, result) => {
      // 得到总记录数
      count = result[0]['count(*)']
    })

    // 搜索
    con.query(sql, [key, start, pageSize], (err, data) => {
      if (err) {
        res.send({
          msg: '暂未找到对应数据',
          code: 400,
          data: err
        })
        return err
      }

      if (data.length > 0) {
        res.send({
          msg: `查询到了${data.length}条数据`,
          code: 200,
          data: {
            list: [
              ...data
            ],
            pageNum,
            pageSize,
            count
          }
        })
      } else {
        res.send({
          msg: '暂未找到对应数据',
          code: 400,
          data: {}
        })
      }
    })
  })

  app.use('/admin/api/categories', router)
}
