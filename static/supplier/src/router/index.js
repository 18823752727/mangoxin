import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import List from '../components/List'
import Message from '../components/Message'
import About from '../components/About'
import ArtiaclDetail from '../components/ArtiaclDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      meta:'index',
      component: Index
    },{
      path: '/list',
      name: 'List',
      meta:'list',
      component: List
    },{
      path: '/message',
      name: 'Message',
      meta:'message',
      component: Message
    },{
      path: '/about',
      name: 'About',
      meta:'about',
      component: About
    },{
      path: '/artiaclDetail',
      name: 'ArtiaclDetail',
      meta:'list',
      component: ArtiaclDetail
    },
  ]
})
