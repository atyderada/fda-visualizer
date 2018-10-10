<template>
  <div class="display">
    <h1 style="margin-top:35px">Generic Names of all {{this.title}} PDs</h1>
    <LineChart v-bind:url="this.query"></LineChart>
  </div>
</template>

<script>
import LineChart from "@/components/D3Graph.vue";

export default {
  name: "display",
  components: {
    LineChart
  },
  data() {
    return {
      title: this.$route.query.title,
      query: 'https://api.fda.gov/drug/label.json?search=openfda.route.exact:' + this.$route.query.title.toUpperCase() + '&count=openfda.generic_name.exact'
    };
  },
};
</script>
