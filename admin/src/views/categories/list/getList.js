import request from '../../../utils/request'
import {ElMessage} from 'element-plus'

// 表格数据
export let tableData = $ref([])

// 获取分类列表
export const getCategoriesList = async () => {
  tableData = []
  let res = await request.get('categories/list')
  if (res.data.length > 0) {
    ElMessage({
      message: res.msg,
      type: 'success'
    })

    res.data.forEach(({id, name}) => {
      tableData.push({
        id,
        name
      })
    })
  } else {
    ElMessage({
      message: '暂无数据',
      type: 'warning'
    })
  }
}
