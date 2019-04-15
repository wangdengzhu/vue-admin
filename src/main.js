// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import _ from 'lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/base.css'
import '@/assets/styles/components.css'
import '@/assets/styles/theme.scss'
import '@/components/elementExtend'
import './permission'

import App from './App'
import store from './store'
import router from './router'
import configs from './utils/configs'
import common from '@/utils/common'
import {DataSource} from './utils/dataSource'

import {post, get} from '@/utils/http'

// 定义全局变量
Vue.prototype.configs = configs // 接口配置文件
Vue.prototype.common = common // 常用方法
Vue.prototype.$post = post // post方法
Vue.prototype.$get = get // fetch方法
Vue.prototype.DataSource = DataSource // 数据订阅
Vue.prototype._ = _ // lodash方法
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
