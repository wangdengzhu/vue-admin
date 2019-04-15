
// 获取cookie
export const getCookie = (key) => {
  if (!key) {
    return null
  }
  const cookieResult = document.cookie.match(new RegExp('(?:^|\\s+|;+)' + key + '=([^;]*)'))
  return cookieResult ? cookieResult[1] : null
}

// 设置cookie
export const setCookie = (key, val, expires) => {
  let expiresTime = null
  if (expires) {
    expiresTime = new Date()
    expiresTime.setMilliseconds(expiresTime.getMilliseconds() + (expires * 864e+5))
    expiresTime = expiresTime.toUTCString()
  }
  document.cookie = [
    encodeURIComponent(key), '=', val,
    expiresTime ? '; expires=' + expiresTime : ''
  ].join('')
}

// 删除cookie
export const removeCookie = (key) => {
  if (!key) {
    return
  }
  document.cookie = key + '=; expires=Mon, 26 Jul 1997 05:00:00 GMT;'
}
