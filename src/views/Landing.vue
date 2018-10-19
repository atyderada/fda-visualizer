<template>
  <div class="landing">
    <h1 style="width: 90vw">openFDA Drug Data Visualizer</h1>
    <h3>Chose a data vizualizer</h3>
    <div id="buttons">
        <router-link to="/routes">
            <div class="button">
                <svg style="width:142px;height:142px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M11.15,15.18L9.73,13.77L11.15,12.35L12.56,13.77L13.97,12.35L12.56,10.94L13.97,9.53L15.39,10.94L16.8,9.53L13.97,6.7L6.9,13.77L9.73,16.6L11.15,15.18M3.08,19L6.2,15.89L4.08,13.77L13.97,3.87L16.1,6L17.5,4.58L16.1,3.16L17.5,1.75L21.75,6L20.34,7.4L18.92,6L17.5,7.4L19.63,9.53L9.73,19.42L7.61,17.3L3.08,21.84V19Z" />
                </svg>
                <p>Drug Routes</p>
            </div>
        </router-link>
        <router-link to="/substances">
            <div class="button">
                <svg style="width:142px;height:142px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M3,3H21V5A2,2 0 0,0 19,7V19A2,2 0 0,1 17,21H7A2,2 0 0,1 5,19V7A2,2 0 0,0 3,5V3M7,5V7H12V8H7V9H10V10H7V11H10V12H7V13H12V14H7V15H10V16H7V19H17V5H7Z" />
                </svg>
                <p>Drug Substances</p>
            </div>
        </router-link>
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
    height: 92vh;
}
#buttons {
    height: 80vh;
    width: 70vw;
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 35px 0;
}
h1 {
    margin: 35px auto 0;
}
h3 {
    margin-bottom: 0px;
}
#buttons a {
    text-decoration: none;
    animation: float 4s ease-in infinite;
}
#buttons a:hover {
    animation: none;
    opacity: 1;
    transform: scale(1.1);
}
.button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    font-weight: 500; 
    color: #382A62;
    background-color: transparent;
    height: 225px;
    border-radius: 50%;
    width: 225px;
    transition: all 2s ease;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border: 0.5px solid lightgrey;
    /* margin-bottom: 25px; */
    /* margin-top: 25px; */
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
    .button {
        width: 280px;
        height: 280px;
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
        /* line-height: 300px; */
    }
    .button {
        width: 300px;
        height: 300px;
    }
}
@keyframes float {
  0% { 
      opacity: 0.5;
      /* transform: translate(15, 5) */
      transform: scale(1)
    }
  50% { 
      opacity: 0.6;
      /* transform: translate(0); */
      transform: scale(1.02)
    }
    100% {
        opacity: 0.5;
        /* transform: translate(0); */
        transform: scale(1)
    }
}
</style>
