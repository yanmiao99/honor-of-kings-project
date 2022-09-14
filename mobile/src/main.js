import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style/global.scss'
import request from './utils/request'
import { Lazyload } from 'vant'

window.$request = request

const app = createApp(App)

app
  .use(Lazyload, { lazyComponent: true }) // 懒加载
  .use(createPinia())
  .use(router)

app.mount('#app')
