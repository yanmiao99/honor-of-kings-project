import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
  history: createWebHashHistory(import.meta.env.BASE_URL), // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', redirect: 'home/community'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
      meta: {
        title: '主页'
      },
      children: [
        {
          path: '/home/community',
          name: 'community',
          component: () => import('../views/community.vue'),
          meta: {
            title: '社区'
          }
        },
        {
          path: '/home/knowledge',
          name: 'knowledge',
          component: () => import('../views/knowledge.vue'),
          meta: {
            title: '知识'
          }
        },
        {
          path: '/home/me',
          name: 'me',
          component: () => import('../views/me.vue'),
          meta: {
            title: '我的'
          }
        }
      ]
    },
    {
      path: '/community-article/:id/:title',
      name: 'community-article',
      component: () => import('../views/community-article.vue'),
      meta: {
        title: '社区文章详情'
      }
    }
  ]
})

export default router
