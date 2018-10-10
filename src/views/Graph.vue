<template>
  <div class="display">
    <h1 style="width:90vw;margin:35px auto">{{this.title}}</h1>
    <LineChart v-bind:url="this.query" v-bind:parent=0></LineChart>
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
      title: 'Substance Names for all Human Prescription Drugs',
      query: 'https://api.fda.gov/drug/label.json?search=openfda.product_type.exact:"HUMAN PRESCRIPTION DRUG"&count=openfda.substance_name.exact&limit=35',
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