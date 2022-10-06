// 创建

import {dialogFormInfo} from './dialog'

export const handleCreateItemCategories = async (row) => {
  dialogFormInfo.value = {
    name: '',
    title: '创建',
    visible: true,
    row: {}
  }
}
