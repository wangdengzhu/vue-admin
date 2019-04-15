import axios from 'axios'
import {loading, hideLoading, alert, message, msgbox} from './element'
import store from '@/store'
// import { getCookie, setCookie } from '@/utils/cookie'
import qs from 'qs'
// 请求超时时间
const service = axios.create({
  timeout: 60000
})

// API基础URL
// webpack 代理模式
axios.defaults.baseURL = '/api'

// 发布正式环境需要更改为下面
// axios.defaults.baseURL = process.env.BASE_API

axios.defaults.headers.post['Content-Type'] = 'application/json'

// 让ajax携带cookie
axios.defaults.withCredentials = true

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      console.log(config)
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      message({
        message: res,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        msgbox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service

/**
 * 配置请求方法
 */
let loadingStaus = false // loading状态
const wrapFail = (statusText, isCustomerError) => {
  if (!isCustomerError) {
    if (statusText == 'timeout') {
      alert('网络请求超时', {
        type: 'error'
      })
    } else if (statusText == 'parsererror') {
      alert('系统出错了', {
        type: 'error'
      })
    } else {
      alert(statusText, {
        type: 'error'
      })
    }
  }
}
const checkStatus = (response, isCustomerError) => {
  if (loadingStaus) {
    loadingStaus = false
    hideLoading()
  }
  const promise = new Promise((resolve, reject) => {
    // 如果状态码正常就直接返回数据,这里的状态码是htttp响应状态码有400，500等，不是后端自定义的状态码
    if (response && ((response.status === 200 || response.status === 304 || response.status === 400))) {
      if (response.data.retStatus !== 200) {
        wrapFail(response.data.retMsg, isCustomerError)
      }
      resolve(response.data) // 直接返回http response响应的data,此data会后端返回的数据数据对象，包含后端自定义的code,message,data属性
    } else {
      reject(new Error(response))
    }
  })
  return promise
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @param isCustomerError=false 默认系统处理错误信息，设为true自己处理
 * @returns {Promise}
 */

// 中断请求
const CancelToken = axios.CancelToken.source()

export function get (url, data = {}, isCustomerError = false, isShowLoading = true) {
  if (isShowLoading && !loadingStaus) {
    loadingStaus = true
    loading()
  }
  return axios.get(url, {
    params: data,
    cancelToken: CancelToken.token
  }).then((res) => {
    return checkStatus(res, isCustomerError)
  }).catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log('中断请求 ==> ', thrown.message)
    } else {
      // 处理错误
    }
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @param isCustomerError=false 默认系统处理错误信息，设为true自己处理
 * @returns {Promise}
 */

export function post (url, data = {}, isCustomerError = false, isShowLoading = true) {
  if (isShowLoading && !loadingStaus) {
    loadingStaus = true
    loading()
  }
  return axios.post(url, qs.stringify(data), {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    cancelToken: CancelToken.token
  }).then((res) => {
    return checkStatus(res, isCustomerError)
  }).catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message)
    } else {
      // 处理错误
    }
  })
}
