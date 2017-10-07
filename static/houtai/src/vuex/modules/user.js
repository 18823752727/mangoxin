import api from '../../http/index';
import * as types from '../types';

const state = {
  userName: localStorage.getItem('userName'), // 用户名
  userId: localStorage.getItem('userId'), // 用户ID
  token: localStorage.getItem('token'), // 用户token
  loginStatus: localStorage.getItem('loginStatus') || false // 用户登录状态
};

const actions = {
  // // 登录获取用户信息
  // setUserInfo({commit}, data) {
  //   api.login(data).then((res) => {
  //     localStorage.setItem('token', res.token);
  //     localStorage.setItem('userName', res.userName);
  //     localStorage.setItem('userId', res.userId);
  //     localStorage.setItem('loginStatus', true);
  //     commit(types.SET_USER_TOKEN, res.token);
  //     commit(types.SET_USER_NAME, res.userName);
  //     commit(types.SET_USER_ID, res.userId);
  //     commit(types.SET_LOGIN_STATUS, true);
  //   })
  // },
  //
  // // 退出登录
  // layout({commit},id) {
  //   let _this = this;
  //
  //   api.layout({
  //     id
  //   }).then(()=>{
  //     _this.clearUserInfo({commit});
  //   })
  // },
  /**
   * 设置用户信息
   * @param data 用户信息
   */
  setUserInfo({commit}, res) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userName', res.userName);
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('loginStatus', true);
    commit(types.SET_USER_TOKEN, res.token);
    commit(types.SET_USER_NAME, res.userName);
    commit(types.SET_USER_ID, res.userId);
    commit(types.SET_LOGIN_STATUS, {
      status: true
    });
  },

  // 清除用户信息
  clearUserInfo({commit}) {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('loginStatus');
    commit(types.SET_USER_TOKEN, '');
    commit(types.SET_USER_NAME, '');
    commit(types.SET_USER_ID, '');
    commit(types.SET_LOGIN_STATUS, {
      status: false
    });
  }
}

const mutations = {
  [types.SET_USER_NAME](state, res) {
    state.userName = res;
  },

  [types.SET_USER_TOKEN](state, res) {
    state.token = res;
  },

  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status;
  },

  [types.SET_USER_ID](state, res) {
    state.userId = res;
  }
}

const getters = {
  userId: state => state.userId,
  token: state => state.token,
  userName: state => state.userName,
  loginStatus: state => state.loginStatus,
}

export default {
  state,
  getters,
  mutations,
  actions
}
