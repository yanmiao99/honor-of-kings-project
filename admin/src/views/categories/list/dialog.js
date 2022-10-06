// 分类名称
import {ElMessage} from 'element-plus'
import request from '../../../utils/request'
import {getCategoriesList} from './getList'

// 弹窗
export let dialogFormInfo = $ref({
  name: '', title: '创建', visible: false, row: {}
})


// 创建分类
export const handleCategoriesDialogConfirm = async () => {
  if (dialogFormInfo.name === '') {
    ElMessage({
      message: '请输入分类名称', type: 'warning'
    })
    return
  }

  // 判断是编辑还是创建
  let res
  if (dialogFormInfo.title === '编辑') {
    // 编辑数据
    res = await request.post('categories/update', {
      name: dialogFormInfo.name, id: dialogFormInfo.row.id
    })
  } else { // 创建
    // 添加数据
    res = await request.post('categories/add', {
      name: dialogFormInfo.name
    })
  }

  // 关闭弹窗
  dialogFormInfo.visible = false
  // 弹窗提示
  ElMessage({
    message: res.msg, type: 'success'
  })
  // 刷新数据
  await getCategoriesList()
}
