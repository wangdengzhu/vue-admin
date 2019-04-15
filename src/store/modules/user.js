import { post } from '@/utils/http'
import configs from '@/utils/configs'
import { getCookie, setCookie, removeCookie } from '@/utils/cookie'

const TokenKey = process.env.DOMAIN

function getToken () {
  return getCookie(TokenKey)
}

function setToken (token) {
  return setCookie(TokenKey, '40701E3C14D499A5C29443E1308FCB1E9924E589BAD9DA6EEAC83B5C043CC816AEA7599450851E8135C21CE6F081FD30BF28A92A47657D5551E333D5E49C7DA016C94C1313AD9AE526B2C2757BB2FF4D97143A1A1F79AA1BF80FD8B5E2641A85D1EB0C1E')
}

function removeToken () {
  return removeCookie(TokenKey)
}

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.userAccount.trim()
      return new Promise((resolve, reject) => {
        post(configs.user['Login'], {
          userAccount: username,
          userPwd: userInfo.userPwd
        }).then((response) => {
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
        /* login(username, userInfo.userPwd).then(response => {
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        }) */
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        /* logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        }) */
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles ({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        /* getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        }) */
      })
    }
  }
}

export default user
