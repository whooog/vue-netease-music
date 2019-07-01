import App from './App.vue'
import Vue from 'vue'
import Router from './router/router.js'

import './common/request.js'
import './plugins/element.js'
import store from './store/index.js'

import 'font-awesome/scss/font-awesome.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:Router,
  store
}).$mount('#app')
