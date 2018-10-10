<template>
  <div id="app">
    <div id="nav">
      <h2>myhELO</h2>
      <div id="options">
        <router-link to="/">Graphs</router-link>
        <router-link to="/art">Art</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  width: 100vw;
  height: 70px;
  display: flex;
  opacity: 0.9;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: lightgray;
}
#nav h2 {
  font-size: 1.5em;
  margin-left: 35px;
}
#options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#options a {
  font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-right: 35px;
}

#nav a.router-link-exact-active {
  color: #42b983;
  color: black;
  font-size: 1.25em;
}
</style>
