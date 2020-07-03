import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pager/home'
import RotationHome from '@/pager/RotationHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    }, {
      path: '/',
      name: 'RotationHome',
      component: RotationHome
    }
  ]
})
