// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import cuid from 'cuid'

Vue.use(Vuetify)

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
