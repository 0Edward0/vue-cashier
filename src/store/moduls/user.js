import cookies from 'js-cookie'
import {loginByUsername, logout, getUserInfo} from '../../api/login'
import {setToken, removeToken} from '../../utils/auth'

function loginSuccess (commit, res) {
  if (!res) {
    throw new Error('用户验证失败')
  }
  commit('SET_TOKEN', res.token)
  commit('SET_USERINFO', res.user)
  commit('SET_ACCOUNT', res.user.account)
  commit('SET_AUTHOR', res.user.shortName)
  setToken(res.token)
}

function logoutSuccess (commit) {
  commit('SET_TOKEN', null)
  commit('SET_USERINFO', null)
  commit('SET_ACCOUNT', null)
  commit('SET_AUTHOR', null)
  removeToken()
}
const user = {
  // 创建一个对象来保存应用启动时的初始状态
  state: {
    // 语言
    language: 'zh',
    // 账号
    account: '',
    // 账号全称
    author: '',
    // 登录token
    token: '',
    // 用户信息对象
    userInfo: null
  },
  mutations: {
    SET_AUTHOR: (state, author_) => { state.author = author_ },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      cookies.set('language', language)
    },
    SET_TOKEN: (state, token) => { state.token = token },
    SET_ACCOUNT: (state, account) => { state.account = account },
    SET_USERINFO: (state, userinfo) => { state.userInfo = userinfo }
  },
  actions: {
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    updateAuthor ({ commit }, author) {
      commit('UPDATE_AUTHOR', author)
    },
    loginByUser ({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.captcha, userInfo.rememberMe).then(response => {
          loginSuccess(commit, response)
          resolve() // 标志请求成功
        }).catch(error => {
          console.error('登录请求失败，请检查。。。')
          reject(error) // 标志请求发生错误
        })
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          logoutSuccess(commit)
          resolve() // 标志请求成功，如果没有这一步。则请求不会走到success
        }).catch(error => {
          console.error('登出请求失败，请检查。。。')
          reject(error) // 标志请求发生错误
        })
      })
    },
    getUserInfo ({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          loginSuccess(commit, response)
          resolve() // 标志请求成功，如果没有这一步。则请求不会走到success
        }).catch(error => {
          console.error('获取用户请求失败，请检查。。。')
          logoutSuccess(commit)
          reject(error) // 标志请求发生错误
        })
      })
    }
  }
}
export default user
