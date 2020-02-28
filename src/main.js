import '@babel/polyfill'
import 'mutationobserver-shim'

import Vue from 'vue'

import './plugins/utilities'
import './plugins/components'
import './plugins/bootstrap-vue'
import router from './plugins/router'
import store from './plugins/store'
import './main.scss'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(require('./main.vue').default)
});