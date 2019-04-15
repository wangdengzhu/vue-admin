/**
 * element-ui 封装扩展
 * @module element-ui
 */
import _ from 'lodash'
import ELEMENT from 'element-ui'
function showMessageBox (msgAction, defaultOption = {}) {
  return function (message, title, options) {
    var promise = new Promise()
    if (_.isPlainObject(title) || _.isFunction(title)) {
      options = title
      title = ''
    }
    if (!_.isPlainObject(options)) {
      options = {}
    }
    options = _.extend({}, defaultOption, options)
    var oldCallback = options.callback
    options.callback = function (action, instance) {
      if (action == 'confirm') {
        promise.resolve(instance)
      } else if (action == 'cancel') {
        promise.reject(instance)
      }
      oldCallback && oldCallback(action, instance)
    }
    title = title || '温馨提示'
    ELEMENT.MessageBox[msgAction](message, title, options)
    var then = promise.then
    promise.then = function (onFulfilled, onRejected) {
      return then(onFulfilled, onRejected ? function (instance) {
        onRejected(instance)
        return new Promise()
      } : null)
    }
    return promise
  }
}
/**
 * 消息弹出框
 * @param {type} message 内容
 * @param {type} title 标题
 * @param {object} options 参考element-ui 官网API MessageBox
 * @function
 */
export const alert = showMessageBox('alert')
/**
 * 确认弹出框
 * @param {type} message 内容
 * @param {type} title 标题
 * @param {object} options 参考element-ui 官网API MessageBox
 * @function
 */
export const confirm = showMessageBox('confirm', {type: 'warning'})
/**
* 对话弹出框
* @param {type} message 内容
* @param {type} title 标题
* @param {object} options 参考element-ui 官网API MessageBox
* @function
*/
export const prompt = showMessageBox('prompt')
/**
 * 自定义弹出框
 * @param {type} options 参考element-ui 官网API MessageBox msgbox
 * @function
 */
export const msgbox = ELEMENT.MessageBox
export const message = ELEMENT.Message
export const notification = ELEMENT.Notification

/**
* 加载动画
*/
var loadingInstance = null
/**
 * 显示加载动画
 * @param {object} options 参考element-ui ELEMENT.Loading
 * @function
 */
export const loading = (options) => {
  loadingInstance = ELEMENT.Loading.service(options)
}
/**
 * 关闭加载动画
 * @param {object} options //参考element-ui ELEMENT.Loading
 * @function
 */
export const hideLoading = () => {
  loadingInstance && loadingInstance.close() && (loadingInstance = null)
}
