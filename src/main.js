import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA3-AByGaPeFXP0fr0qQQo0V1Pno9JKpXg",
    libraries: "places" // necessary for places input
  }
})

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
