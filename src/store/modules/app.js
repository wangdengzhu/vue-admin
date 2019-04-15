const app = {
  state: {
    navType: 'default',
    sidebar: {
      isCollapse: false
    }
  },
  mutations: {
    CLICK_NAV: (state, navType) => {
      // 获取导航ID
      state.navType = navType
    },
    CLICK_COLLAPSE: (state, isCollapse) => {
      // 控制sidebar展示方式
      state.sidebar.isCollapse = isCollapse
    }
  },
  actions: {
    clickNav ({ commit }, navType) {
      commit('CLICK_NAV', navType)
    },
    clickCollapse ({ commit }, isCollapse) {
      commit('CLICK_COLLAPSE', isCollapse)
    }
  }
}
export default app
