<template>
  <el-container class="layout-container">
    <el-header>
      <div class="toolbar">
        <div class="toolbar-left">
          <h1>
            王者荣耀后台管理系统
          </h1>
        </div>

        <div class="toolbar-right">
          <el-dropdown trigger="click">
            <div class="toolbar-user-info">
              <el-icon>
                <setting/>
              </el-icon>
              <span>Tom</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu
              router
              :default-openeds="['1']"
              background-color="#282A36"
              text-color="#fff"
              active-text-color="#ffd04b"
              :default-active="$route.path"
          >
            <!-- $route.path 解决路由跳转后菜单不会跟随变化的问题 -->
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <icon-menu/>
                </el-icon>
                内容管理
              </template>
              <el-menu-item-group title="分类">
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
                <el-menu-item index="/categories/list1">test</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="1-3">test</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-scrollbar>
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {RouterView} from 'vue-router'
import {Menu as IconMenu, Setting} from '@element-plus/icons-vue'

</script>

<style scoped lang="scss">

.layout-container {
  .el-header {
    position: relative;
    background-color: #282A36;
    color: #fff;
    border-bottom: 1px solid #ccc;
  }

  .el-aside {
    color: var(--el-text-color-primary);
    background: #f5f5f5;
    border-right: 1px solid #f0f0f0;
  }

  .el-menu {
    border-right: none;
    height: calc(100vh - 60px);
  }

  .el-main {
    padding: 10px;
    box-sizing: border-box;
  }

  .toolbar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .toolbar-left {
      h1 {
        color: #fff;
        font-weight: bold;
      }
    }

    .toolbar-right {
      .toolbar-user-info {
        color: #fff;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        .el-icon {
          margin-right: 8px;
        }
      }
    }
  }

}

</style>
