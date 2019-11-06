<template>
  <div id="app">
    <div id="nav">
      <div class="left">
        <span class="logo">
          <router-link :to="{ name: 'home' }">SmudgeJS</router-link>
        </span>
      </div>
      <div class="menu">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'about' }">About</router-link>
        <router-link :to="{ name: 'users' }">Users</router-link>
        <router-link
          v-if="auth.username"
          :to="{ name: 'user', params: {username: auth.username}}"
        >{{auth.displayName}}</router-link>
      </div>
      <SignIn class="signin" />
    </div>
    <router-view id="content" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SignIn from '@/components/SignIn.vue';
import { auth } from '@/firebase/auth';

export default Vue.extend({
  name: 'app',
  components: {
    SignIn,
  },
  data: () => ({
    auth,
  }),
});
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Quicksand:500&display=swap');
@import '@/scss/_shared.scss';

html {
  min-height: 100%;
  display: flex;
  box-sizing: border-box;
}

body {
  margin: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  @include column;
}

#nav {
  padding: $vertical-margin 0;

  border-bottom: 1px solid black;
  font-size: 20px;

  display: flex;
  justify-content: space-between;
  a {
    color: black;
    text-decoration: none;
  }
  .menu a {
    padding: 5px 30px;
  }
}
</style>
