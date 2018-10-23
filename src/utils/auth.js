import cookies from 'js-cookie'

const tokenKey = 'auth_token'

/**
 * 设置cookies
 * @param token
 */
export function setToken (token) {
  return cookies.set(tokenKey, token, { expires: 7, path: '/' })
}

/**
 * 获取cookies
 * @param token
 */
export function getToken () {
  return cookies.get(tokenKey)
}

/**
 * 删除cookies
 * @param token
 */
export function removeToken () {
  return cookies.remove(tokenKey)
}
