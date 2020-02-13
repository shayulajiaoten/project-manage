/**
 *  用户store
 */
import {
  getMessage
} from "../../api/user"

const state = {
  userInfo: {},
}

const mutations = {
  // 页面初始化
  GET_MESSAGE: (state, res) => {
    state.userInfo = res.data
  },
  SET_USER: (state, data) => {
    state.userInfo = Object.assign(state.userInfo, data)
  },
  SET_LOGOUT: (state) => {
    state.userInfo = null;
  },

}

const actions = {
  setUser({
    commit
  }, data) {
    commit('SET_USER', data);
  },
  getMessage({
    commit,
  }, data) {
    return new Promise((resolve, reject) => {
      getMessage().then((res) => {
        if (res.code === 200) {
          commit('GET_MESSAGE', res)
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  setLogOut({
    commit,
  }, data) {
    commit('SET_LOGOUT')
  }
}

export default {
  state,
  mutations,
  actions
}