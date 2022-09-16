<template>
  <el-container class="layout-container-demo">
    <el-header>
      <div class="toolbar">
        <el-dropdown trigger="click">
          <el-icon style="margin-right: 8px; margin-top: 1px;color:#fff">
            <setting/>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>Tom</span>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu router :default-openeds="['1']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <icon-menu/>
                </el-icon>
                内容管理
              </template>
              <el-menu-item-group title="分类">
                <el-menu-item index="/categories/create">创建分类</el-menu-item>
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="1-3">Option 3</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140"/>
            <el-table-column prop="name" label="Name" width="120"/>
            <el-table-column prop="address" label="Address"/>
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {ref} from 'vue'
import {Menu as IconMenu, Message, Setting} from '@element-plus/icons-vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles'
}
const tableData = ref(Array.from({length: 10}).fill(item))
</script>

<style scoped lang="scss">
.layout-container-demo .el-header {
  position: relative;
  background-color: #282A36;
  color: #fff;
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #f5f5f5;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  height: 100%;
  right: 20px;
}
</style>
