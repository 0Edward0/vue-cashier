import request from '@/utils/request'
import {updateByParam} from '@/api/public'

/**
  登录。带入用户名，密码，验证码
 */
export function loginByUsername (username, password, captcha, rememberMe) {
  const data = {
    username: username,
    password: password,
    captcha: captcha,
    rememberMe: rememberMe
  }
  return request({
    url: '/auth/login',
    data: data,
    method: 'post',
    type: 'application/json'
  })
}

/**
 * 注销，登出
 */
export function logout () {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo () {
  return request({
    url: '/auth/userInfo',
    method: 'post'
  })
}

/**
 * 修改密码
 */
export function updateUserPassword (obj) {
  return updateByParam('/auth/updatePassword', obj)
}
