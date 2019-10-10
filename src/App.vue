<template>
  <div id="app">
    <div id="nav">
      <div>
        <span>SmudgeJS</span>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <SignIn />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SignIn from "@/components/SignIn.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "app",
  components: {
    SignIn
  }
});
</script>


<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#nav {
  padding: 5px;
  border-bottom: 1px dotted black;
  display: flex;
  justify-content: space-between;
  span,
  a {
    font-weight: bold;
    color: black;
    margin-right: 1em;
    &.router-link-exact-active {
      color: red;
    }
  }
}
</style>
