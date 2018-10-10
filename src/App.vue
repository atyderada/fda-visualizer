<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><img alt="myhELO logo" src="./assets/myheloLogoDark.png" style="width:auto;height:35px"></router-link>
      <div id="options">
        <router-link to="/">Routes</router-link>
        <router-link to="/substances">Substances</router-link>
      </div>
    </div>
    <router-view/>
    <div id="footer">
      <router-link to="/"><img alt="myhELO logo" src="./assets/myheloLogowhite.png" style="width:auto;height:35px"></router-link>
      <router-link to="/">Art</router-link>
    </div>
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
  background-color: #E4E4E4;
}
#nav img {
  margin-left: 25px;
}
#options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#options a {
  font-size: 1em;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-right: 30px;
}
#nav a.router-link-exact-active {
  /* color: #42b983; */
  color: black;
  font-size: 1.1em;
}
#footer {
  width: 100vw;
  height: 70px;
  display: flex;
  opacity: 0.9;
  flex-direction: row;
  align-items: center;
  background-color: #AA92C7;
  justify-content: space-between;
}
#footer a {
  font-size: 1.1em;
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin-right: 90px;
}
#footer img {
  margin-left: 35px;
}
</style>
