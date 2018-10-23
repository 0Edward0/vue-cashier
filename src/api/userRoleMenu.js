// import request from '@/utils/request'
import {listByParam, updateByParam, deleteByParam, getByParam} from './public'

const urseProfix = '/sys/user'
const roleProfix = '/sys/role'
const menuProfix = '/sys/menu'

/** ===============================用户========================================== */
/** 查询用户列表 */
export function listUser (queryobj, currentPage, pageSize) {
  return listByParam(urseProfix, queryobj, currentPage, pageSize)
}

/** 添加用户 */
export function addUser (queryobj) {
  return updateByParam(urseProfix + '/add', queryobj)
}
/** 修改用户 */
export function updateUser (queryobj) {
  return updateByParam(urseProfix + '/update', queryobj)
}
/** 删除用户 */
export function delUser (ids) {
  return deleteByParam(`${urseProfix}/delete/${ids.join(',')}`)
}
/** 获取用户 */
export function getUser (id) {
  return getByParam(`${urseProfix}/${id}`)
}

/** ===============================角色========================================== */
/** 查询角色列表 */
export function listRole (queryobj, currentPage, pageSize) {
  return listByParam(roleProfix, queryobj, currentPage, pageSize)
}
/** 添加角色 */
export function addRole (queryobj) {
  return updateByParam(roleProfix + '/add', queryobj)
}
/** 修改角色 */
export function updateRole (queryobj) {
  return updateByParam(roleProfix + '/update', queryobj)
}
/** 删除角色 */
export function delRole (ids) {
  return deleteByParam(`${roleProfix}/delete/${ids.join(',')}`)
}
/** 获取角色 */
export function getRole (id) {
  return getByParam(`${roleProfix}/${id}`)
}

/** ===============================用户========================================== */
/** 查询菜单列表 */
export function listMenu (queryobj, currentPage, pageSize) {
  return listByParam(menuProfix, queryobj, currentPage, pageSize)
}

/** 添加菜单 */
export function addMenu (queryobj) {
  return updateByParam(menuProfix + '/add', queryobj)
}
/** 修改菜单 */
export function updateMenu (queryobj) {
  return updateByParam(menuProfix + '/update', queryobj)
}
/** 删除菜单 */
export function delMenu (ids) {
  return deleteByParam(`${menuProfix}/delete/${ids.join(',')}`)
}
/** 删除菜单 */
export function getMenu (id) {
  return getByParam(`${menuProfix}/${id}`)
}
