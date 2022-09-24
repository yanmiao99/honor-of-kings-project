import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name: 'main', component: () => import('../views/main.vue'),
      children: [
        {
          path: 'categories/list',
          name: 'categories-list',
          component: () => import('../views/categories/list.vue'),
          meta: {
            title: '分类列表'
          }
        }], meta: {
        title: '导航页'
      }
    }
  ]
})

export default router
