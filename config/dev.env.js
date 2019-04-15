'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://checksystem.manjd.com"', // 配置为本地地址才会访问到本地虚拟的服务器
  // DOMAIN: '"manjddev.com"', // 开发环境 设置请求地址的domain
  DOMAIN: '"check.manjd.com"' // 测试环境  设置请求地址的domain
})
