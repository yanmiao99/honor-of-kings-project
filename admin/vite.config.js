import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(
    {
      refTransform: true, // 配置可使用 $ref 进行定义变量
      reactivityTransform: true
    }
  )],
  base: './', // 打包相对路径
  server: {
    // host: getLocalIp, // 本机的局域网IP
    port: 2334, // 指定端口号
    proxy: {
      '/api': { // 跨域配置
        target: 'http://127.0.0.1:3000/admin/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url))
    }
  }
})
