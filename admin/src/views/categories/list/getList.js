import request from '../../../utils/request'
import {ElMessage} from 'element-plus'

// 表格数据
export let tableData = $ref([])

// 分页切换
export let pageTotal = $ref(10)
export let curPage = $ref(1)


// 获取分类列表
export const getCategoriesList = async () => {
  tableData = []
  let res = await request.get('categories/list', {
    pageSize: 10, pageNum: curPage
  })
  if (res.data.count > 0) {
    ElMessage({
      message: res.msg, type: 'success'
    })
    // 渲染数据
    res.data.list.forEach(({id, name}) => {
      tableData.push({
        id, name
      })
    })

    // 总数
    pageTotal = res.data.count

    // 当前页
    curPage = res.data.pageNum
  } else {
    ElMessage({
      message: '暂无数据', type: 'warning'
    })
  }
}

// 切换分页
export const handleCurrentChange = async (e) => {
  await getCategoriesList()
}
