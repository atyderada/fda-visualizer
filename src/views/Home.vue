<template>
  <div class="home">
    <h1 style="margin-top:35px">Routes summary of Human PDs</h1>
    <LineChart v-bind:url="this.query"></LineChart>
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
      query: 'https://api.fda.gov/drug/label.json?search=openfda.product_type.exact:"HUMAN PRESCRIPTION DRUG"&count=openfda.route.exact'
    };
  }
};
</script>
