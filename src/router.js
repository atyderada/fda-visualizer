import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import MonaLisa from './views/MonaLisa.vue';
import Depth from "./views/Depth.vue";

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
    },
    {
      path: '/route',
      name: 'route',
      props: true,
      component: Depth,
    }
  ]
});
