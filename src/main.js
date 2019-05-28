import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LightTimeline from '../node_modules/vue-light-timeline';
import vuetable from '../node_modules/vuetable-2'
import element from '../node_modules/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueVideoPlayer from '../node_modules/vue-video-player'
import 'video.js/dist/video-js.css'
require('vue-video-player/src/custom-theme.css')
import './plugins/element.js'

Vue.use(LightTimeline)
Vue.use(vuetable)
Vue.use(element)
Vue.use(vueVideoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
