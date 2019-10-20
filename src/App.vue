<template>
  <div id="app">
    <div id="nav">
      <div class="left">
        <span class="logo">SmudgeJS</span>
      </div>
      <div class="menu">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/profile">Profile</router-link>
      </div>
      <SignIn class="signin" />
    </div>
    <router-view id="content" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SignIn from '@/components/SignIn.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'app',
  components: {
    SignIn,
  },
});
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Quicksand:500&display=swap');

body {
  margin: 0;
  font-family: 'Quicksand', Helvetica, Arial, sans-serif;
  line-height: 1.6;
}

.columns {
  display: flex;
}
.column {
  margin: 0 20px;
  flex: 1;
}

button {
  border: none;
  background: #7cc;
  font-size: 15px;
  &:hover {
    background: #c7c;
  }

  margin-bottom: 5px;
  padding: 3px 10px;
  border-radius: 6px;
}

#nav {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  border-bottom: 1px solid gray;
  .logo {
  }

  .menu a {
    color: black;
    padding: 5px 30px;
    text-decoration: none;
  }
}
</style>
