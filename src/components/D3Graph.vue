<template>
  <div>
    <Loader v-if="loading"/>
    <div v-if="routes">
      <transition name="fade">
        <div id="graphs">
          <div id="bar" style="flex:1;">
            <div id="bChart"></div>
          </div>
          <div id="bubble" style="flex:1;">
            <div id="chart"></div>
            <div id="legend">
              <div class="legendCell">
                <div style="width:15px; height:12px; background-color: #AA92C7"></div>
                <p>0 - 250</p>
              </div>
              <div class="legendCell">
                <div style="width:15px; height:12px; background-color: #794692"></div>
                <p>250 - 500</p>
              </div>
              <div class="legendCell"> 
                <div style="width:15px; height:12px; background-color: #6A468D"></div>
                <p>500 - 2000</p>
              </div>
              <div class="legendCell">
                <div style="width:15px; height:12px; background-color: #382A62"></div>
                <p>&gt; 2000</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div id="list">
        <div class="row">
          <h3>Term</h3>
          <h3>Count</h3>
        </div>
        <div class="row" v-for="route in this.routes">
          <h5>{{route.term}}</h5>
          <h5>{{route.count}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';
import * as d3 from "d3";

export default {
  name: "LineChart",
  components: {
    Loader,
  },
  props: ['url', 'parent'],
  data() {
    return {
      routes: [],
      loading: false,
    };
  },
  created: function() {
    this.loading = true;
    this.$http
      .get(
        this.url
      )
      .then(
        response => {
          for (let route in response.data.results) {
            this.routes.push({ term: response.data.results[route].term, count: response.data.results[route].count });
          }
          this.createBubbleChart();
          this.createBarChart();
          this.loading = false;
        },
        error => {
          console.log("ERROR");
          console.error(error);
        }
      );
  },
  methods: {
    createBubbleChart() {
      // D3 Bubble Chart
      const routeData = [];
      for (let index in this.routes) {
        let tempRoute = { name: this.routes[index].term, value: this.routes[index].count};
        routeData.push(tempRoute);
        // console.log(tempRoute);
      }
      const dataSet = {children: routeData};
      const diameter = 350;

      const bubble = d3.pack()
        .size([diameter, diameter])
        .padding(4);

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
        .style("font-size", "0em")
        .style("z-index", "0")
        .style("cursor", () => (this.parent===1) ? "pointer" : "default")
        .style("transition", "all 0.2s ease-out")
        .on("mouseover", function(d, i, nodes) { nodes[i].style.fontSize = "1em" })
        .on("mouseout", function(d, i, nodes) { nodes[i].style.fontSize = "0em" })
        .on("click", (d, i, nodes) => { if (this.parent === 1) {this.$router.push({ path: 'generic', query: { title: d.data.name }}) }});

      node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("z-index", "0")
        .style("fill", function(d) {
          let number = d.data.value;
          if (number < 250) {
            return '#AA92C7';
          } else if (number < 500) {
            return '#794692';
          } else if (number < 2000) {
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
    createBarChart() {
      const routeData = [];
      let count = 0;
      for (let index in this.routes) {
        if (count > 3) {
          break;
        }
        let tempRoute = { name: this.routes[index].term, value: this.routes[index].count};
        routeData.push(tempRoute);
        count++;
      }

      var dimensions = {
        gWidth: 320,
        gHeight: 400,
        gMargin: 40,
        gInnerWidth: 300,
        gInnerHeight: 320,
        bMargin: 15
      };

      // Define the scales
      var xScale = d3.scaleLinear()
                    .domain ([0, routeData.length])
                    .range([0, dimensions.gInnerWidth]);

      // Get the max value for the data. This will determine how high our y-scale is
      var maxValue = d3.max(routeData, function( d ) { return d.value; });

      // Now define the yScale, or vertical scale
      var yScale = d3.scaleLinear()
                    .domain([0, maxValue])
                    .range([0, dimensions.gInnerHeight]);

      // Finally, define the yAxis scale. This is identical to the yScale except that the domain is inverted. This is because the scale is determined from top down, rather than bottom up, and the data would look upside down otherwise.
      var yAxisScale = d3.scaleLinear()
                        .domain([maxValue, 0])
                        .range([0, dimensions.gInnerHeight]);

      // Render the chart
      // Select the containing element and append an SVG with your defined width and height
      var chart = d3.select('#bChart')
        .append('svg')
        .attr('width', dimensions.gWidth)
        .attr('height', dimensions.gHeight);

      // Render the y-axis
      var yAxis = d3.axisLeft( yAxisScale )
                    // This is to make the horizontal tick lines stretch all the way across the chart
                    .tickSizeInner( -dimensions.gInnerWidth )
                    // This spaces the tick values slights from the axis
                    .tickPadding( 10 );

      chart.append('g')
          .attr('class', 'axis axis-y')
          .attr('transform', 'translate(' + dimensions.gMargin + ', ' + dimensions.gMargin + ')')
          .call( yAxis );

      // Define the ticks for the xAxis
      var xTicks = []
      for (var i = 0; i < routeData.length; i++) {
        xTicks.push( i + 0.5 ); // 0.5 is to ensure the ticks are offset correctly to match the data
      }
      // Render the x-axis
      var xAxis = d3.axisBottom( xScale )
                    .tickValues( xTicks )
                    .tickFormat(function(d, i) {
                      return routeData[i].name;
                    });

      chart.append('g')
          .attr('class', 'axis axis-x')
          .attr('transform', 'translate(' + dimensions.gMargin + ', ' + ( dimensions.gMargin + dimensions.gInnerHeight ) + ')')
          .call( xAxis );

      // Render the bars
      // This is rendered last so the bars appear on top of the axis and not vice versa
      var barAttributes = {
        class: 'bar-line',
        transform: 'translate(' + dimensions.gMargin + ', ' + dimensions.gMargin + ')',
        height: function( d, i ) {
          return yScale( d.value );
        },
        width: (dimensions.gInnerWidth / routeData.length) - (dimensions.bMargin * 2 ),
        x: function( d, i ) { return (dimensions.gInnerWidth / routeData.length) * i + dimensions.bMargin; },
        y: function( d, i ) { return dimensions.gInnerHeight - yScale( d.value ); }
      };

      chart.append('g')
          .selectAll('.' + barAttributes.class)
          .data( routeData )
          .enter()
          .append('rect')
          .attr('class', 'bar-line')
          .attr('transform', 'translate(' + dimensions.gMargin + ', ' + dimensions.gMargin + ')')
          .attr('height', function( d, i ) { return yScale( d.value );})
          .attr('width', (dimensions.gInnerWidth / routeData.length) - (dimensions.bMargin * 2 ))
          .attr('x', function( d, i ) { return (dimensions.gInnerWidth / routeData.length) * i + dimensions.bMargin; })
          .attr('y', function( d, i ) { return dimensions.gInnerHeight - yScale( d.value ); })
          .style("fill", function(d) {
            let number = d.value;
            if (number < 250) {
              return '#AA92C7';
            } else if (number < 500) {
              return '#794692';
            } else if (number < 2000) {
              return '#6A468D';
            } else {
              return '#382A62';
            }
          });
    },
  }
};
</script>

<style lang="css" scoped>
#graphs {
  width:90vw;
  display:flex;
  flex-direction:column;
  margin:0 auto 45px;
}
#legend {
  width: 92vw;
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
#bar {
  transform: scale()
}
#list {
  width: 90%;
  margin: auto;
  margin-bottom: 0px;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease-out;
  /* transition: width 0.4 ease-in; */
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  /* width: 0; */
}
@media only screen and (min-width: 1025px) {
  #graphs {
    flex-direction:row;
    margin:0 auto 45px;
  }
  #legend {
  width: 420px;
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
#bar {
  transform: scale()
}
#list {
  width: 90%;
  margin: auto;
  margin-bottom: 0px;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease-out;
  /* transition: width 0.4 ease-in; */
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  /* width: 0; */
}
}
</style>