import Vue from 'vue'
import Vuex from 'vuex'
import marked from 'marked'

// modules
import user from './modules/user';

//marked配置文件
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

Vue.use(Vuex);

const state = {
  content: '',
  renderHtml: '',
  isLogin: true
}

const mutations = {
  MARKDOWN_SUCCESS(state, value) {
    state.renderHtml = value;
  },
  LOGIN(state,value){
    state.isLogin = value;
  }
}

const actions = {
  renderMarkdown({commit}, value) {
    commit('MARKDOWN_SUCCESS', value)
  },
  isLogin({commit},value){
    commit('LOGIN',value);
  }
}

const getters = {
    getRawHtml: state => state.rawHtml,
    getRenderHtml: state => state.renderHtml,
    isLogin: state => state.isLogin
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user
  }
})
