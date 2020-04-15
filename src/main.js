import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueIpfs from './plugins/vue-ipfs';
import vuemoment from 'vue-moment'

// Load our IPFS plugin.
Vue.use(VueIpfs);
Vue.use(vuemoment);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
