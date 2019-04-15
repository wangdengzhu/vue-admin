class Observer {
  constructor () {
    // 储存订阅者
    this.subName = {}
    // 储存订阅者id
    this.subUid = -1
  }
  // 监听
  listen (name, func) {
    if (!this.subName[name]) {
      this.subName[name] = []
    }
    let token = (++this.subUid).toString()
    this.subName[name].push({
      token: token,
      func: func
    })
    // 方便退订
    return token
  }
  // 发布
  publish (name, args) {
    if (!this.subName[name]) {
      return false
    }
    // 给订阅者回调函数
    let len = this.subName[name].length
    while (len--) {
      this.subName[name][len].func(args)
    }
  }
  // 退订
  unsubscribe (token) {
    for (let key in this.subName) {
      for (var i = 0, j = this.subName[key].length; i < j; i++) {
        if (this.subName[key][i].token === token) {
          this.subName[key].splice(i, 1)
          return token
        }
      }
    }
    return false
  }
}

export {
  Observer
}
