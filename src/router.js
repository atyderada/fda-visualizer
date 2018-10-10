import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import MonaLisa from './views/MonaLisa.vue';
import Depth from "./views/Depth.vue";
import Graph from "./views/Graph.vue";

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
      path: '/generic',
      name: 'generic',
      props: true,
      component: Depth,
    },
    {
      path: '/substances',
      name: 'substances',
      props: true,
      component: Graph,
    }
  ]
});
