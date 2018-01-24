import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/NotFound'
import Home from '@/views/Home'
import TopCats from '@/views/TopCats'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/catmash/',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/topcats',
      name: 'TopCats',
      component: TopCats
    }
  ]
})
