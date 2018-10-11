<template>
  <div class="landing">
    <h1 style="width: 90vw">openFDA Drug Data Visualizer</h1>
    <h3>Chose a data vizualizer</h3>
    <div id="buttons">
        <router-link to="/routes">Drug Routes</router-link>
        <router-link to="/substances">Drug Substances</router-link>
    </div>
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
.landing {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-image: linear-gradient(to bottom, 
    #FFFFFF 0px,
    rgb(244, 239, 250) 90%);
    height: 82vh;
}
#buttons {
    height: 65vh;
    width: 70vw;
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
h1 {
    margin: 35px auto 0;
}
h3 {
    margin-bottom: 0px;
}
#buttons a {
    text-decoration: none;
    font-size: 1.2em;
    font-weight: 500; 
    color: #382A62;
    background-color: white;
    opacity: 0.6;
    height: 200px;
    line-height: 200px;
    border-radius: 50%;
    width: 200px;
    transition: all 1s ease;
    /* border: 0.5px solid lightgrey; */
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    animation: float 4s ease infinite;
}
#buttons a:hover {
    animation: none;
    opacity: 0.8;
    transform: scale(1.1);
}
@media only screen and (min-width: 768px) {
    .landing {
        height: 90vh;
    }
    h1 {
        margin-top: 50px;
        margin-bottom: 35px;
    }
    h3 {
        margin-bottom: 0px;
    }
    #buttons {
        height: 70vh;
        width: 90vw;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    #buttons a {
        width: 280px;
        height: 280px;
        line-height: 280px;
    }
}
@media only screen and (min-width: 1025px) {
    .landing {
        height: 85vh;
    }
    #buttons {
        height: 60vh;
        width: 70vw;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
    #buttons a {
        width: 300px;
        height: 300px;
        line-height: 300px;
    }
}
@keyframes float {
  0% { 
      opacity: 0.4;
      /* transform: translate(15, 5) */
      transform: scale(1)
    }
  50% { 
      opacity: 0.5;
      /* transform: translate(0); */
      transform: scale(1.02)
    }
    100% {
        opacity: 0.4;
        /* transform: translate(0); */
        transform: scale(1)
    }
}
</style>
