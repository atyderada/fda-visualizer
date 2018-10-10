<template>
  <div class="home">
    <h1 style="width: 90vw;margin:35px auto">Human Prescription Drug Routes</h1>
    <LineChart v-bind:url="this.query" v-bind:parent=1></LineChart>
  </div>
</template>

<script>
import LineChart from "@/components/D3Graph.vue";

export default {
  name: "home",
  components: {
    LineChart
  },
  data() {
    return {
      name: "Anthony De Rada",
      query: 'https://api.fda.gov/drug/label.json?search=openfda.product_type.exact:"HUMAN PRESCRIPTION DRUG"&count=openfda.route.exact&limit=35'
    };
  }
};
</script>

<style>
  .home {
    background-image: linear-gradient(to bottom, 
    #FFFFFF 0px,
    rgb(243, 238, 250) 25%);
  }
</style>
