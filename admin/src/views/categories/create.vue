<template>
  创建
</template>

<script setup>
import request from '../../utils/request'

const getCategoriesAdd = async () => {
  let res = await request.post('categories/add', {
    name: '测试'
  })
  console.log(res)
}

getCategoriesAdd()


</script>

<style scoped>

</style>
