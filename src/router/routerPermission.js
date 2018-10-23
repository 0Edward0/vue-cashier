import router from '@/router'
import store from '@/store'
import {getToken} from '@/utils/auth'

const nprogress = require('nprogress')
// nprogress 进度条
nprogress.configure({showSpinner: false})

// 过滤白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  nprogress.start()

  const store_ = store
  // 判断是否有登录token
  if (getToken()) {
    // 如果有还走login就跳转首页
    if (to.path === '/login') {
      next('/index')
      nprogress.done()
    } else {
      // 判断角色，测试暂时通过
      if (store_.getters.userInfo) {
        next()
        nprogress.done()
      } else {
        store_.dispatch('getUserInfo').then(res => {
          next('/index')
        }).catch(() => {
          next('/login')
        })
      }
    }
  } else {
    // 白名单过滤
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
