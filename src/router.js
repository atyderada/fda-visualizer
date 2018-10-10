import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import MonaLisa from './views/MonaLisa.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/art",
      name: "art",
      component: MonaLisa
    }
  ]
});
