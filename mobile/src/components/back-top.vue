<template>
  <div class="back-top" @click="handleBackTop" ref="backTop" v-show="backTopShow">
    <van-icon name="upgrade" size="40" color="#2B8AEC"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const backTop = ref()

// eslint-disable-next-line no-unused-vars
let backTopShow = $ref(false)

onMounted(() => {
  // 监听页面滚动
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  backTopShow = scrollTop >= 200
}

const handleBackTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(handleBackTop)
    window.scrollTo(0, c - c / 8)
  }
}
handleBackTop()

</script>

<style scoped lang="scss">
.back-top {
  position: fixed;
  bottom: 100px;
  right: 30px;
  border-radius: 50%;
  display: flex;
  background: #fff;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
}
</style>
