import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueIpfs from './plugins/vue-ipfs';
import vuemoment from 'vue-moment'
import wysiwyg from "vue-wysiwyg";
import VueSanitize from "vue-sanitize";

Vue.use(VueIpfs);
Vue.use(vuemoment);
Vue.use(wysiwyg, {});
Vue.use(VueSanitize, {
  allowedTags: VueSanitize.defaults.allowedTags.concat([ 'img' ]),
  allowedSchemes: [ 'data' ]
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
