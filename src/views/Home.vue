<template>
  <div class="home">
    <h2>Routes of administration</h2>
    <LineChart></LineChart>
  </div>
</template>

<script>
// @ is an alias to /src
import LineChart from "@/components/D3Graph.vue";

export default {
  name: "home",
  components: {
    LineChart
  },
  data () {
      return {
          routes: [],
          name: "Anthony De Rada"
      }
  },
  created: function() {
        console.log("Graph component created");
        this.$http.get('https://api.fda.gov/drug/label.json?search=openfda.product_type.exact:"HUMAN PRESCRIPTION DRUG"&count=openfda.route.exact').then(response => {
            for(let route in response.data.results) {
                this.routes.push(response.data.results[route]);
            }
            console.log(response.data.results);
        }, error => {
            console.log("ERROR");
            console.error(error);
        });
    }
};
</script>
