// 编辑

import {dialogFormInfo} from './dialog'

export const handleEditItemCategories = async (row) => {
  dialogFormInfo.value = {
    name: row.name,
    title: '编辑',
    visible: true,
    row
  }

}
