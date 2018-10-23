// 考虑如何更好地在组件外部管理状态(把组件的共享状态抽取出来,以一个全局单例模式管理)
import getters from './getters'
import {user, menu, dict} from './moduls'
const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex)
// 创建Store实例
const store = new Vuex.Store({
  modules: {
    user, menu, dict
  },
  getters
})
export default store
