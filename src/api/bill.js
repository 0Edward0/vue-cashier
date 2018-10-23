import {listByParam, updateByParam, deleteByParam, getByParam, postByParam} from './public'

const produceProfix = '/bill/produce'
const stockProfix = '/bill/stock'
const saleProfix = '/bill/sale'

/** ===============================产品========================================== */
/** 查询产品列表 */
export function listProduce (queryobj, currentPage, pageSize) {
  return listByParam(produceProfix, queryobj, currentPage, pageSize)
}

/** 添加产品 */
export function addProduce (queryobj) {
  return updateByParam(produceProfix + '/add', queryobj)
}
/** 修改产品 */
export function updateProduce (queryobj) {
  return updateByParam(produceProfix + '/update', queryobj)
}
/** 删除产品 */
export function delProduce (ids) {
  return deleteByParam(`${produceProfix}/delete/${ids.join(',')}`)
}
/** 获取产品 */
export function getProduce (id) {
  return getByParam(`${produceProfix}/${id}`)
}

/** ===============================进货支出========================================== */
/** 查询进货支出列表 */
export function listStock (queryobj, currentPage, pageSize) {
  return listByParam(stockProfix, queryobj, currentPage, pageSize)
}
/** 添加进货支出 */
export function addStock (queryobj) {
  return updateByParam(stockProfix + '/add', queryobj)
}
/** 修改进货支出 */
export function updateStock (queryobj) {
  return updateByParam(stockProfix + '/update', queryobj)
}
/** 删除进货支出 */
export function delStock (ids) {
  return deleteByParam(`${stockProfix}/delete/${ids.join(',')}`)
}
/** 获取进货支出 */
export function getStock (id) {
  return getByParam(`${stockProfix}/${id}`)
}

/** ===============================销售记录========================================== */
/** 查询销售记录列表 */
export function listSale (queryobj, currentPage, pageSize) {
  return listByParam(saleProfix, queryobj, currentPage, pageSize)
}

/** 添加销售记录 */
export function addSale (queryobj) {
  return updateByParam(saleProfix + '/add', queryobj)
}
/** 修改销售记录 */
export function updateSale (queryobj) {
  return updateByParam(saleProfix + '/update', queryobj)
}
/** 删除销售记录 */
export function delSale (ids) {
  return deleteByParam(`${saleProfix}/delete/${ids.join(',')}`)
}
/** 获取销售记录 */
export function getSale (id) {
  return getByParam(`${saleProfix}/${id}`)
}

/** 批量确认拿货 */
export function confirmGoods (param) {
  return postByParam(`${saleProfix}/confirmGoods`, param)
}
/** 批量确认支付 */
export function confirmPayment (param) {
  return postByParam(`${saleProfix}/confirmPayment`, param)
}

/** 加载产品下拉数据 */
export function loadProduce () {
  return getByParam(`${produceProfix}/produceDict`)
}

/** ===============================首页汇总========================================== */

/** 首页汇总。仓库剩余量 */
export function countWareHouse (type) {
  return getByParam(`${saleProfix}/countWareHouse/${type}`)
}

/** 首页汇总。带提货剩余量 */
export function countTodoGood (type) {
  return getByParam(`${saleProfix}/countTodoGood/${type}`)
}

/** 首页汇总。待支付剩余量 */
export function countTodoPayment (type) {
  return getByParam(`${saleProfix}/countTodoPayment/${type}`)
}

/** 首页汇总。总支出 */
export function countAllStock (type) {
  return getByParam(`${saleProfix}/countAllStock/${type}`)
}

/** 首页汇总。总销售 */
export function countAllSale (type) {
  return getByParam(`${saleProfix}/countAllSale/${type}`)
}

/** 首页汇总。总利润 */
export function countAllProfix (type) {
  return getByParam(`${saleProfix}/countAllProfix/${type}`)
}
