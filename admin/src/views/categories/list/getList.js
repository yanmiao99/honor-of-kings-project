import request from '../../../utils/request'
import {ElMessage} from 'element-plus'
import {handleSearchCategoriesName, searchName} from './search'

// 表格数据
export let tableData = $ref([])

// 分页切换
export let pageTotal = $ref(10)
export let curPage = $ref(1)

// 获取分类列表
export const getCategoriesList = async () => {
  let res = await request.get('categories/list', {
    pageSize: 10, pageNum: curPage
  })
  renderTableData(res)
}

// 渲染表格数据
export const renderTableData = (res) => {
  let newTableData = []  // 这里用覆盖, 可以防止切换闪烁
  if (res.data.count > 0) {
    // 渲染数据
    res.data.list.forEach(({id, name}) => {
      newTableData.push({
        id, name
      })
    })
    tableData = newTableData

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
  if (searchName === '') {
    await getCategoriesList()
  } else {
    await handleSearchCategoriesName()
  }
}
