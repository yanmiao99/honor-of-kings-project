//  axios 二次封装

// 引入文件
import axios from 'axios'
import {ElMessage} from 'element-plus'

// 全局配置
const service = axios.create({
  baseURL: '/api', // 根路径
  timeout: 8000 // 请求超时时间
})

// 响应拦截
service.interceptors.response.use((res) => {
  // 根据业务进行配置
  const {code, data, msg} = res.data

  if (code === 200) {
    // 请求成功
    return res.data
  } else if (code === 400) {
    // 请求失败
    ElMessage.error(msg)
    return Promise.reject(msg) // 终止程序 
  }
  return res
})

// request 方法
function request(options) {
  options.method = options.method || 'get'

  if (options.method.toLowerCase() === 'get') options.params = options.data

  return service(options)
}

// * request.post('/api',{xxx:xxx})

['get', 'post', 'put', 'delete'].forEach((item) => {
  request[item] = (url, data) => {
    return request({
      url, data, method: item
    })
  }
})

export default request
