import store from '@/store'
import {getToken} from '@/utils/auth'
import {message} from './message'
const Loading = require('element-ui').Loading

const axios = require('axios')
/** axios 全局配置 */
// const baseUrl = process.env.API_HOST
// console.info(baseUrl)
const axiosConfig = axios.create({
  // baseURL: baseUrl, // api的base_url
  // baseURL: process.env.API_HOST, // api的base_url
  timeout: 30000
  // responseType: 'json'
})
let reqLoading = null
axiosConfig.interceptors.request.use(config => {
  // 修改头部请求
  const store_ = store
  if (store_.getters.token || getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  if (reqLoading == null) {
    reqLoading = Loading.service({
      fullscreen: false,
      spinner: 'el-icon-loading',
      text: '请稍后，拼命加载中...',
      target: 'main'
    })
  }
  return config
}, error => {
  setTimeout(function () {
    if (reqLoading) {
      reqLoading.close()
      reqLoading = null
    }
  }, 200)
  message('请求发送失败', 'error')
  console.error(error)
  Promise.request(error)
})

axiosConfig.interceptors.response.use(
  response => {
    const res = response.data
    setTimeout(function () {
      if (reqLoading) {
        reqLoading.close()
        reqLoading = null
      }
    }, 200)
    if (res.status === false || res.code !== 200) {
      message(res.msg, 'error')
      return Promise.reject(res)
    }
    return res.content
  }, error => {
    setTimeout(function () {
      if (reqLoading) {
        reqLoading.close()
        reqLoading = null
      }
    }, 1000)
    // 请求超时处理
    if (error.code === 'ECONNABORTED') {
      message('请求超时，请稍后重试', 'error')
      // return false
    }
    // 后端服务器挂了
    if (error.response.status && error.response.status === 504) {
      message('请求服务器失联，请联系管理员', 'error')
      // return false
    }
    // 后端服务器挂了
    if (error.response.status && error.response.status === 404) {
      message('请求服务器失联，请联系管理员', 'error')
      // return false
    }
    const res = error.response.data || error.response
    console.error(res.msg)

    // 请求后端处理发生异常
    if (res.code === 400) {
      message(`错误信息:${res.msg}`, 'error')
      return Promise.reject(error)
    } else if (res.code === 403) {
      // 登录会话过期。
      message(res.msg + '  自动跳转登录中。。。', 'error')
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
      return false
    } else if (res.code === 404) {
      // 请求路径错误
      message('请求数据失败:没有找到对应的请求', 'error')
      // return false
    } else if (res.code === 504) {
      // 后端服务器挂了
      message('请求服务器失联，请联系管理员', 'error')
      return false
    } else {
      console.error('请求数据失败')
      return Promise.reject(error)
    }
  })

export default axiosConfig
