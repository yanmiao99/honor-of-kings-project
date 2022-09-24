<template>
  <h2 class="big-title">分类列表</h2>
  <el-table :data="tableData" stripe border style="width: 100%" :max-height="tableHeight">
    <el-table-column prop="id" label="ID" width="100" align="center"/>
    <el-table-column prop="name" label="分类名称"/>
    <el-table-column fixed="right" label="操作" width="200" align="center">
      <template #default="scope">
        <el-button
            type="primary"
            size="small"
            @click.prevent="handleEditItemCategories(scope.row)">
          编辑
        </el-button>
        <el-button
            type="danger"
            size="small"
            @click.prevent="handleDeleteItemCategories(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {ElMessage} from 'element-plus'
import request from '../../utils/request'
import {onMounted, nextTick} from 'vue'


let tableHeight = $ref(100) // table 高度

// 动态计算高度
const getAutoHeight = () => {
  nextTick(() => {
    tableHeight = document.body.scrollHeight - 124
  })
}

let flag = $ref(true)
// 窗口发生改变, 重新计算 table 高度
window.onresize = () => {
  if (!flag) return
  getAutoHeight()
  flag = false
  setTimeout(() => {
    flag = true
  }, 100)
}

const tableData = $ref([]) // 表格数据

onMounted(() => {
  getCategoriesList() // 请求数据
  getAutoHeight() // 动态计算表格高度
})

// 获取分类列表
const getCategoriesList = async () => {
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

// 编辑
const handleEditItemCategories = async (row) => {
  console.log(row)
}

// 删除
const handleDeleteItemCategories = async (row) => {
  console.log(row)
}

</script>

<style scoped>

</style>
