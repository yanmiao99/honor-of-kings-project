<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-sticky>
      <van-tabs v-model:active="tabActive" animated border color="#2B8AEC">
        <van-tab v-for="item in tabList" :key="item.to" :to="item.to">
          <template #title>
            <van-icon :name="item.icon" style="margin-right: 5px"/>
            <span>{{ item.title }}</span>
          </template>
        </van-tab>
      </van-tabs>
    </van-sticky>
    <!-- 路由视图 -->
    <RouterView class="wrapper-body"/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

const tabList = $ref([
  {
    title: '社区',
    icon: 'home-o',
    to: '/home/community'
  },
  {
    title: '知识',
    icon: 'star-o',
    to: '/home/knowledge'
  },
  {
    title: '我的',
    icon: 'smile-o',
    to: '/home/me'
  }
])
const tabActive = $ref(0)

</script>

<style scoped lang="scss">

.wrapper-body {
}

// 样式穿透
::v-deep(.van-tab--active) {
  color: #2B8AEC;

  span {
    font-weight: bold !important;
  }
}

::v-deep(.van-tabs__wrap) {
  padding-bottom: 5px;
}
</style>
