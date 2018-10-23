import moment from 'moment'

/**
 * 常用工具转换类
 */

/**
 * element-ui table 日期时间格式化
 * @param row
 * @param column
 * @returns {string}
 */

export function dataFormatter (row, column) {
  let date = row[column.property]
  if (date === undefined || date === '' || date === null) {
    return ''
  }
  // mount 日期转换工具类。格式必须是YYYY-MM-DD
  return moment(date).format('YYYY-MM-DD')
}

/**
 * element-ui table 日期时间格式化
 * @param row
 * @param column
 * @returns {string}
 */
export function dataTimeFormatter (row, column) {
  let date = row[column.property]
  if (date === undefined || date === '' || date === null) {
    return ''
  }
  // mount 日期转换工具类。格式必须是YYYY-MM-DD
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export function yesNoFormatter (row, column) {
  let data = row[column.property]
  if (data === undefined || data === '' || data === null) {
    return ''
  }
  return data === 0 ? '否' : '是'
}
