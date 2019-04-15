import { get } from '@/utils/http'
import { Observer } from './core'

let ob = new Observer()

class CreatSourse {
  constructor (props) {
    this.options = {
      transport: props.transport, // 远程ajax 参数
      parseData: props.parseData // 数据转换
    }
    this.loading = true // loading动画
    this.defaultParams = this.options.transport.data ? this.options.transport.data() : ''
  }
  read (data) {
    if (!this.options.transport.name) {
      console.log('请填入正确的api接口！')
      return
    }

    let list = this.options.transport.data ? this.options.transport.data() : ''

    // 覆盖请求的参数
    for (let key in data) {
      list[key] = data[key]
    }

    // 除了页码和翻页数量，其他参数有值改变就让页码回到第一页
    for (let key in list) {
      if (key != 'PageIndex' && key != 'PageSize' && this.defaultParams[key] != list[key]) {
        ob.publish('pageIndexHandler', 1)
        list.PageIndex = 1
      }
    }

    this.loading = true
    ob.publish('before-' + this.options.transport.name, this.loading)

    get(this.options.transport.name, list, false, false).then(res => {
      // 发送请求后
      this.loading = false
      ob.publish('after-' + this.options.transport.name, this.loading)

      // 返回列表数据
      ob.publish('complete-' + this.options.transport.name, res.retBody)

      this.options.parseData(res.retBody)

      // 请求完成后，设置默认参数
      this.defaultParams = list
    }).catch(err => {
      console.log(err)
    })
  }
  // 请求前
  onBeforeHandler (cb) {
    ob.listen('before-' + this.options.transport.name, cb)
  }
  // 请求后
  onAfterHandler (cb) {
    ob.listen('after-' + this.options.transport.name, cb)
  }
  // 请求成功
  onComplete (cb) {
    ob.listen('complete-' + this.options.transport.name, cb)
  }
  // 移除订阅
  onRemove () {
    ob.unsubscribe(ob.listen('complete-' + this.options.transport.name))
  }
  setState (data) {
    this.options = Object.assign(this.options, data)
  }
  setRequest (data) {
    this.options.data.List = Object.assign(this.options.data.List, data)
  }
  getData () {
    return this.options.data || {List: []}
  }
  getItemData (idx) {
    return this.data[idx]
  }
}

class LocalSource {
  constructor () {
    console.log('我没发送请求。。。')
  }
}

function DataSource (options) {
  if (options.transport) {
    return new CreatSourse(options)
  } else {
    return new LocalSource(options)
  }
}

export {
  DataSource,
  ob
}
