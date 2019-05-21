import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import listPage from './views/listPage/listPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/safetyProtection',  //安防
      name: 'safetyProtection',
      component: () => import(/* webpackChunkName: "about" */ './views/safetyProtection.vue')
    },
    {
      path: '/temperatureControl', //温控
      name: 'temperatureControl',
      component: () => import('./views/temperatureControl.vue')
    },
    {
      path: '/electronicTags', //电子标签
      name: 'electronicTags',
      component: () => import('./views/electronicTags.vue')
    },
    {
      path: '/archivalDataStatistics', //档案数据统计
      name: 'archivalDataStatistics',
      component: () => import('./views/archivalDataStatistics.vue')
    },
    {
      path: '/realtimeMessage', //实时消息
      name: 'realtimeMessage',
      component: () => import('./views/realtimeMessage.vue')
    },
    {
      path: '/fireControl', //消防
      name: 'fireControl',
      component: () => import('./views/fireControl.vue')
    },
    {
      path: '/usageStatistics', //利用统计
      name: 'usageStatistics',
      component: () => import('./views/usageStatistics.vue')
    }
  ]
})
