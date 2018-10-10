<template>
  <div class="display">
    <div id="bar" style="display:flex;width:90vw;margin:auto;flex-direction:row;justify-content:space-between;align-items:center;">
      <router-link to="/">
        <svg style="width:28px;height:28px" viewBox="0 0 24 24">
            <path fill="#000000" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>
      </router-link>
      <h1 style="width:90vw;margin:35px auto">Generic Names of all {{this.title}} Human Prescription Drugs</h1>
    </div>
    <LineChart v-bind:url="this.query" v-bind:parent=0></LineChart>
    <!-- <LineChart v-bind:url="this.query2"></LineChart> -->
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
      query: 'https://api.fda.gov/drug/label.json?search=openfda.route.exact:' + this.$route.query.title.toUpperCase() + '&count=openfda.generic_name.exact&limit=35',
      query2: 'https://api.fda.gov/drug/label.json?search=openfda.route.exact:' + this.$route.query.title.toUpperCase() + '&count=openfda.brand_name.exact&limit=35'
    };
  },
};
</script>

<style>
    .display {
        background-image: linear-gradient(to bottom, 
        #FFFFFF 0px,
        rgb(243, 238, 250) 25%);
    }
</style>