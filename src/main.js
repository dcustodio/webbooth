// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import cuid from 'cuid'
import VuePersist from 'vue-persist'

Vue.use(Vuetify, {
  theme: {
    primary: '#00796b',
    secondary: '#BE000E',
    accent: '#8c9eff',
    error: '#EE0D1D'
  }
})
// primary lighten #48a999
// primary darken #004c40
// secondary lighten f84c38
// secondary darken 860000
Vue.use(VuePersist)

const shared = {
  sessionId: cuid()
}

shared.install = function () {
  Object.defineProperty(Vue.prototype, '$global', {
    get () { return shared }
  })
}

Vue.use(shared)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
