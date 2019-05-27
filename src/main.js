import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LightTimeline from '../node_modules/vue-light-timeline';
import vuetable from '../node_modules/vuetable-2'

Vue.use(LightTimeline)
Vue.use(vuetable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
