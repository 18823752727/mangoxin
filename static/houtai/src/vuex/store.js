import Vue from 'vue'
import Vuex from 'vuex'
import marked from 'marked'

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
  renderHtml: ''
}

const mutations = {
  MARKDOWN_SUCCESS(state, value) {
    state.renderHtml = value;
  }
}

const actions = {
  renderMarkdown({commit}, value) {
    commit('MARKDOWN_SUCCESS', value)
  }
}

const getters = {
    getRawHtml: state => state.rawHtml,
    getRenderHtml: state => state.renderHtml
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
