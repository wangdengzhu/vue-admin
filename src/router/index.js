import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = resolve => require(['@/views/index'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/default',
      component: index,
      redirect: '/default/index',
      children: [
        {
          path: '/default/index',
          name: 'default',
          meta: {
            title: 'default'
          },
          component: resolve => require(['@/views/default'], resolve)
        }
      ]
    },
    {
      path: '/portal',
      name: '系统管理',
      redirect: '/portal/portal1',
      component: index,
      children: [
        {
          path: '/portal/portal1',
          name: 'portal1',
          meta: {
            title: 'portal1'
          },
          component: resolve => require(['@/views/pms/pms21'], resolve)
        },
        {
          path: '/portal/portal2',
          name: 'portal2',
          meta: {
            title: 'portal2'
          },
          component: resolve => require(['@/views/pms/pms22'], resolve)
        }
      ]
    }, {
      path: '/pms',
      name: '商品管理',
      component: index,
      redirect: 'noredirect',
      children: [
        {
          path: '/pms/pms1',
          name: 'pms1',
          meta: {
            title: 'pms1'
          },
          component: resolve => require(['@/views/pms/pms1'], resolve)
        }, {
          path: '/pms/pms2',
          name: 'pms2',
          meta: {
            title: 'pms2'
          },
          component: resolve => require(['@/views/pms/pms2'], resolve)
        }, {
          path: '/pms/pms3',
          name: 'pms3',
          meta: {
            title: 'pms3'
          },
          component: resolve => require(['@/views/pms/pms3'], resolve)
        }, {
          path: '/pms/pms4',
          name: 'pms4',
          meta: {
            title: 'pms4'
          },
          component: resolve => require(['@/views/pms/pms4'], resolve)
        }, {
          path: '/pms/pms5',
          name: 'pms5',
          meta: {
            title: 'pms5'
          },
          component: resolve => require(['@/views/pms/pms5'], resolve)
        }, {
          path: '/pms/pms6',
          name: 'pms6',
          meta: {
            title: 'pms6'
          },
          component: resolve => require(['@/views/pms/pms6'], resolve)
        }, {
          path: '/pms/pms7',
          name: 'pms7',
          meta: {
            title: 'pms7'
          },
          component: resolve => require(['@/views/pms/pms7'], resolve)
        }, {
          path: '/pms/pms8',
          name: 'pms8',
          meta: {
            title: 'pms8'
          },
          component: resolve => require(['@/views/pms/pms8'], resolve)
        }, {
          path: '/pms/pms9',
          name: 'pms9',
          meta: {
            title: 'pms9'
          },
          component: resolve => require(['@/views/pms/pms9'], resolve)
        }, {
          path: '/pms/pms10',
          name: 'pms10',
          meta: {
            title: 'pms10'
          },
          component: resolve => require(['@/views/pms/pms10'], resolve)
        }, {
          path: '/pms/pms11',
          name: 'pms11',
          meta: {
            title: 'pms11'
          },
          component: resolve => require(['@/views/pms/pms11'], resolve)
        }, {
          path: '/pms/pms12',
          name: 'pms12',
          meta: {
            title: 'pms12'
          },
          component: resolve => require(['@/views/pms/pms12'], resolve)
        }, {
          path: '/pms/pms13',
          name: 'pms13',
          meta: {
            title: 'pms13'
          },
          component: resolve => require(['@/views/pms/pms13'], resolve)
        }, {
          path: '/pms/pms14',
          name: 'pms14',
          meta: {
            title: 'pms14'
          },
          component: resolve => require(['@/views/pms/pms14'], resolve)
        }, {
          path: '/pms/pms15',
          name: 'pms15',
          meta: {
            title: 'pms15'
          },
          component: resolve => require(['@/views/pms/pms15'], resolve)
        }, {
          path: '/pms/pms16',
          name: 'pms16',
          meta: {
            title: 'pms16'
          },
          component: resolve => require(['@/views/pms/pms16'], resolve)
        }, {
          path: '/pms/pms17',
          name: 'pms17',
          meta: {
            title: 'pms17'
          },
          component: resolve => require(['@/views/pms/pms17'], resolve)
        }, {
          path: '/pms/pms18',
          name: 'pms18',
          meta: {
            title: 'pms18'
          },
          component: resolve => require(['@/views/pms/pms18'], resolve)
        }, {
          path: '/pms/pms19',
          name: 'pms19',
          meta: {
            title: 'pms19'
          },
          component: resolve => require(['@/views/pms/pms19'], resolve)
        }
      ]
    }, {
      path: '/pms1',
      name: 'xxxxx',
      component: index,
      redirect: 'noredirect',
      children: [
        {
          path: '/pms/pms20',
          name: 'pms20',
          meta: {
            title: 'pms20'
          },
          component: resolve => require(['@/views/pms/pms20'], resolve)
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    }, {
      path: '*',
      component: resolve => require(['@/views/404'], resolve)
    }
  ]
})
