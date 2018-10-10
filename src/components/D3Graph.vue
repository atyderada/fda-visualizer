<template>
  <div>
    <div id="chart"></div>
    <div id="legend">
      <div class="legendCell">
        <div style="width:15px; height:10px; background-color: #AA92C7"></div>
        <p>500-</p>
      </div>
      <div class="legendCell">
        <div style="width:15px; height:10px; background-color: #794692"></div>
        <p>500+</p>
      </div>
      <div class="legendCell"> 
        <div style="width:15px; height:10px; background-color: #6A468D"></div>
        <p>1500+</p>
      </div>
      <div class="legendCell">
        <div style="width:15px; height:10px; background-color: #382A62"></div>
        <p>3000+</p>
      </div>
    </div>
    <div id="list">
      <div class="row">
        <h2>Term</h2>
        <h2>Count</h2>
      </div>
      <div class="row" v-for="route in this.routes">
        <h5>{{route.term}}</h5>
        <h5>{{route.count}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "LineChart",
  props: ['url'],
  data() {
    return {
      routes: [],
    };
  },
  created: function() {
    this.$http
      .get(
        this.url
      )
      .then(
        response => {
          for (let route in response.data.results) {
            this.routes.push({ term: response.data.results[route].term, count: response.data.results[route].count });
          }
          this.calculatePath();
        },
        error => {
          console.log("ERROR");
          console.error(error);
        }
      );
  },
  methods: {
    calculatePath() {
      // D3 Bubble Chart
      const routeData = [];
      for (let index in this.routes) {
        let tempRoute = { name: this.routes[index].term, value: this.routes[index].count, visible: false};
        routeData.push(tempRoute);
        // console.log(tempRoute);
      }
      const dataSet = {children: routeData};
      const diameter = 350;

      const bubble = d3.pack()
        .size([diameter, diameter])
        .padding(5);

      const margin = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }

      const svg = d3.select('#chart').append('svg')
        .attr('viewBox','0 0 ' + (diameter + margin.right) + ' ' + diameter)
        .attr('width', (diameter + margin.right))
        .attr('height', diameter)
        .attr('class', 'chart-svg');

      const root = d3.hierarchy(dataSet)
        .sum(function(d) { return d.value; })
        .sort(function(a, b) { return b.value - a.value; });

      bubble(root);

      const node = svg.selectAll('.node')
        .data(root.children)
        .enter()
        .append('g').attr('class', 'node')
        .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
        .append('g').attr('class', 'graph')
        .style("font-size", "0.5em")
        .style("z-index", "0")
        .style("cursor", "pointer")
        .on("mouseover", function(d, i, nodes) { nodes[i].style.fontSize = "1em" })
        .on("mouseout", function(d, i, nodes) { nodes[i].style.fontSize = "0.5em" })
        .on("click", (d, i, nodes) => { this.$router.push({ path: 'route', query: { title: d.data.name }}) });

      node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("z-index", "0")
        .style("fill", function(d) {
          let number = d.data.value;
          if (number < 500) {
            return '#AA92C7';
          } else if (number < 1500) {
            return '#794692';
          } else if (number < 3000) {
            return '#6A468D';
          } else {
            return '#382A62';
          }
        });

      node.append("text")
        .attr("dy", ".3em")
        .style("height", "100%")
        .style("width", "100%")
        .style("text-anchor", "middle")
        .style("fill", "lightgrey")
        .style("font-weight", "600")
        .style("z-index", "1")
        .text(function(d) { return d.data.value });
        // .style("fill", "transparent")
        // .on("mouseover", function(d, i, nodes) { nodes[i].style.fill = "white" })
        // .on("mouseout", function(d, i, nodes) { nodes[i].style.fill = "transparent" });
    },
    mouseOver(circle) {
      console.log(circle);
    },
    mouseOut(circle) {
      console.log(circle);
    },
  }
};
</script>

<style lang="css" scoped>
#legend {
  width: 40vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}
.legendCell {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}
.legendCell p {
  margin-left: 5px;
}
#list {
  width: 90vw;
  margin: auto;
  margin-bottom: 100px;
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid lightgrey;
}
.row * {
  flex: 1;
  text-align: center;
}
</style>