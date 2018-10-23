// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import store from './store'
// 路由权限控制
import '@/router/routerPermission'

// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import echarts from 'echarts'
// /** css */
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN'
// import 'nprogress/nprogress.css' // 引入进度条样式

const Vue = require('vue')
const element = require('element-ui')
const echarts = require('echarts')
// 使用elementui,并且引入中文
Vue.use(element)

// 设置图表属性为全局属性
Vue.prototype.$echarts = echarts

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

const bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    bus
  },
  components: { App },
  template: '<App/>'
})
