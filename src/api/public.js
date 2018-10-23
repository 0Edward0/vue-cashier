import request from '@/utils/request'

/** 列表查询通用处理逻辑 */
export function listByParam (url, queryobj, currentPage, pageSize) {
  let data = {obj: queryobj, currentPage: currentPage, pageSize: pageSize}
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(data),
    // 指定headers 的Content-Type 'application/json; charset=UTF-8' 否则报错：Content type 'application/x-www-form-urlencoded;charset=UTF-8' not supported
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    // contentType: 'application/json'
  })
}

/** 通用保存处理逻辑 */
export function updateByParam (url, queryobj) {
  let data = {obj: queryobj}
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(data),
    // 指定headers 的Content-Type 'application/json; charset=UTF-8' 否则报错：Content type 'application/x-www-form-urlencoded;charset=UTF-8' not supported
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    // contentType: 'application/json'
  })
}

/** 通用删除请求逻辑 */
export function deleteByParam (url) {
  return request({
    url: url,
    method: 'delete'
  })
}

/** 通用get请求逻辑 */
export function getByParam (url) {
  return request({
    url: url,
    method: 'get'
  })
}

/** 通用post请求逻辑 */
export function postByParam (url, data) {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}
