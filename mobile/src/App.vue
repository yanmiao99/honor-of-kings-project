<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script setup>
import { RouterView } from 'vue-router'

</script>

<style lang="scss" scoped>

</style>
