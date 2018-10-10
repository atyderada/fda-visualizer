import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.options.root = 'https://api.fda.gov/drug/label.json?';
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
