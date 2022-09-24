<template>
  <h2 class="big-title">创建分类</h2>
  <el-input v-model="categoriesName" placeholder="请输入分类名称"/>
  <el-button type="primary" @click="handleCreateCategories">创建分类</el-button>
</template>

<script setup>
import request from '../../utils/request'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'

const router = useRouter()
const categoriesName = $ref('') // 分类名称

// 创建分类
const handleCreateCategories = async () => {
  if (categoriesName === '') {
    ElMessage({
      message: '请输入分类名称',
      type: 'warning'
    })
    return
  }
  let res = await request.post('categories/add', {
    name: categoriesName
  })

  await router.push('list')

  ElMessage({
    message: res.msg,
    type: 'success'
  })
}

</script>

<style scoped lang="scss">
.el-button {
  margin-top: 10px;
  display: flex;
  margin-left: auto;

}
</style>
