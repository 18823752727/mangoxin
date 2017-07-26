import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Create from '@/components/Create'
import Index from '@/components/Index'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/',
      name: 'create',
      component: Index,
      children:[
        {
          path:'/',
          name:'list',
          component: List
        },{
          path: '/create',
          name: 'create',
          component: Create
        }
      ]
    },{
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})
