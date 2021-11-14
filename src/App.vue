<template>
  <StartingScreen :loading="loading" />
  <Header />
  <router-view :key="$route.params" />
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view /> -->
</template>

<script>
import StartingScreen from "./components/StartingScreen.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    StartingScreen,
    Header,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    window.addEventListener("load", () => {
      this.loading = !this.loading;
    });
  },
};
</script>

<style lang="scss">
@import "./assets/Styles/custom.css";
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  & * {
    font-family: "Raleway", sans-serif;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
