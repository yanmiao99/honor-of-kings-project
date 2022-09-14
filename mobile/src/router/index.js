import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
  history: createWebHashHistory(import.meta.env.BASE_URL), // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
      meta: {
        title: '主页'
      }
    }
  ]
})

export default router
