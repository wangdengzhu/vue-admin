import router from './router'

// 路由白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // 判断是否有cookie
  if (document.cookie) {
    next()
    return
  }
  if (whiteList.indexOf(to.path) > -1) {
    // 在免登录白名单，直接进入
    next()
    return
  }
  if (to.fullPath === '/') {
    next(`/login`)
  } else {
    // 否则全部重定向到登录页
    next(`/login?redirect=${to.path}`)
  }
})

router.afterEach(() => {
})
