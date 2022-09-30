// 搜索
import request from '../../../utils/request'
import {curPage, getCategoriesList, renderTableData} from './getList'

export let searchName = $ref('')

export const handleSearchCategoriesName = async () => {
  // 1. 获取 key
  let key = searchName

  // 2. 判断搜索框是否有数据
  if (key === '') {
    await getCategoriesList()
  } else {
    // 3. 请求数据
    let res = await request.get('categories/search', {
      key,
      pageSize: 10,
      pageNum: curPage.value  // 不知道为啥需要这样子获取
    })
    // 4. 渲染数据
    await renderTableData(res)
  }
}

