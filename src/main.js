import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import qs from 'qs'
import filters from './utils/filter'
import bus from './utils/eventBus'
import to from './utils/to'

import './plugins/element.js'
import './assets/scss/style.scss'


Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$bus = bus
Vue.prototype.$qs = qs
Vue.prototype.$to = to


Object.keys(filters).map(v => {
  Vue.filter(v, filters[v])
})

Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: localStorage.token || ''
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
