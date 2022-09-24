<template>
  <!-- 标题 -->
  <h2 class="big-title">分类列表</h2>

  <!-- 功能区域 -->
  <div class="function-area">
    <div class="search">
      <el-input v-model="searchName" placeholder="请输入分类名称">
        <template #append>
          <el-button :icon="Search" @click="handleSearchCategoriesName"/>
        </template>
      </el-input>
    </div>
    <div class="create">
      <el-button type="primary" @click="dialogFormVisible = true">创建</el-button>
    </div>
    <div class="batch-delete">
      <el-button type="danger">批量删除</el-button>
    </div>
  </div>

  <!-- 创建弹窗 -->
  <el-dialog v-model="dialogFormVisible" title="创建">
    <el-form>
      <el-form-item label="名称">
        <el-input v-model="categoriesName" autocomplete="off" placeholder="请输入分类名称"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateCategories">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 表格展示 -->
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
  <!-- 分页 -->
</template>

<script setup>
import {onMounted} from 'vue'
import {getAutoHeight, tableHeight} from './list/autoHeight'
import {handleSearchCategoriesName, searchName} from './list/search'
import {handleCreateCategories, categoriesName, dialogFormVisible} from './list/create'
import {getCategoriesList, tableData} from './list/getList'
import {handleEditItemCategories} from './list/edit'
import {handleDeleteItemCategories} from './list/delete'
import {Search} from '@element-plus/icons-vue'

onMounted(() => {
  getCategoriesList() // 请求数据
  getAutoHeight() // 动态计算表格高度
})


</script>

<style scoped>

</style>
