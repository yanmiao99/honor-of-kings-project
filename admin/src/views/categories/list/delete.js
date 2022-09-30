// 删除
import request from '../../../utils/request'
import {ElMessage} from 'element-plus'
import {getCategoriesList} from './getList'

export const handleDeleteItemCategories = async (row) => {
  // 获取单条的 id 数据
  let id = row.id

  // 发送请求
  let res = await request.post('categories/delete', {id})

  ElMessage({
    message: res.msg, type: 'success'
  })

  // 回调刷新数据
  await getCategoriesList()

}
