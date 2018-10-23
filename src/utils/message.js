
const Message = require('element-ui').Message
const MessageBox = require('element-ui').MessageBox
/**
 * 提示消息公用类
 */
export function message (msg, type) {
  Message({
    message: msg,
    type: type,
    center: true,
    duration: 2 * 1000
  })
}

/**
 * 删除警告公用类
 * @returns {Promise<MessageBoxData>}
 */
export function delMsg () {
  return MessageBox.confirm('数据删除不可恢复，确认要删除吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}
