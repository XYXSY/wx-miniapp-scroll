import {login, logout, getInfo, getPayType, getConductor, TransactionQuery, getBarCode} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    realname:'',
    avatar: '',
    introduction: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_REALNAME: (state, name) => {
    state.realname = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  }
}

/**
 * 登录组件
 * @type {{logout({commit: *, state: *}): Promise<unknown>,getPayType({commit: *, state: *}): Promise<unknown>, getInfo({commit: *, state: *}): Promise<unknown>, changeRoles({commit: *, dispatch: *}, *): Promise<void>, login({commit: *}, *): Promise<unknown>, resetToken({commit: *}): Promise<unknown>}}
 */
const actions = {
  // user login
  login({commit}, userInfo) {
    // 在这里可以加入验证码属性
    // const { username, password, captcha } = userInfo
    const {username, password,geetest_challenge,geetest_seccode,geetest_validate} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password,geetest_challenge:geetest_challenge,geetest_seccode:geetest_seccode,geetest_validate:geetest_validate}).then(response => {
        const {JSESSIONID} = response
        let data = {token:JSESSIONID}
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {user} = response

        if (!user) {
          return reject('Verification failed, please Login again.')
        }
        user.roles = ['admin']
        const {username,realname, headPortrait, roles, introduction} = user
        commit('SET_ROLES', roles) //暂无
        commit('SET_NAME', username)
        commit('SET_REALNAME', realname)
        commit('SET_AVATAR', headPortrait)
        commit('SET_INTRODUCTION', '') //暂无
        resolve(user)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 获取支付信息
   * @param commit
   * @param state
   * @returns {Promise<unknown>}
   */
  getPayType({commit, state}) {
    return new Promise((resolve, reject) => {
      getPayType(state.token).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getConductor({commit, state}) {
    return new Promise((resolve, reject) => {
      getConductor(state.token).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 交易查询
   * @param commit
   * @param state
   * @returns {Promise<unknown>}
   */
  TransactionQuery({commit, state}, parems) {
    // console.log(parems)
    return new Promise((resolve, reject) => {
      TransactionQuery(parems).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 交易查询界面订单条码查询接口
   * @param commit
   * @param state
   * @param parems
   * @returns {Promise<unknown>}
   */
  getBarCode({commit}, data) {
    // 在这里可以加入验证码属性


    // console.log(data)
    return new Promise((resolve, reject) => {
      // {ORDERDETAILID:'0001'}
      getBarCode({orderDetailId:data.orderDetailId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() 
      commit('RESET_STATE')
      resolve()
    })
  },
  // dynamically modify permissions
  async changeRoles({commit, dispatch}, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const {roles} = await dispatch('getInfo')
    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {root: true})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,

}

