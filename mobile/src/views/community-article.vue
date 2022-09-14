<template>
  <!-- 标题 -->
  <div class="community-article">
    <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="handleClickBack"
        border
        fixed
        placeholder
    >
      <template #title>
        <span class="navbar-title van-ellipsis">{{ articleTitle }}啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</span>
      </template>
    </van-nav-bar>
    <div class="community-content">
      我是文章 , 文章 id : {{ articleId }}
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const articleId = route.params.id
const articleTitle = route.params.title

const handleClickBack = () => history.back()

</script>

<style scoped lang="scss">
.community-article {
  .navbar-title {
    width: 100px;
  }

  .community-content {
    margin-top: 10px;
  }
}

</style>
