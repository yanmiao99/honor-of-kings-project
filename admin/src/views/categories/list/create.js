import {ElMessage} from 'element-plus'
import request from '../../../utils/request'
import {getCategoriesList} from './getList'

// 分类名称
export const categoriesName = $ref('')

// 弹窗
export let dialogFormVisible = $ref(false)

// 创建分类
export const handleCreateCategories = async () => {
  if (categoriesName === '') {
    ElMessage({
      message: '请输入分类名称', type: 'warning'
    })
    return
  }
  // 添加数据
  let res = await request.post('categories/add', {
    name: categoriesName
  })
  // 关闭弹窗
  dialogFormVisible = false

  // 弹窗提示
  ElMessage({
    message: res.msg, type: 'success'
  })
  // 刷新数据
  await getCategoriesList()
}
