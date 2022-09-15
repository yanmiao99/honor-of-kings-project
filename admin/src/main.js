import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style/global.scss'
import request from './utils/request'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

window.$request = request

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(ElementPlus)

app.mount('#app')
