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
          v-if="user.username"
          :to="{ name: 'user', params: {username: user.username}}"
        >{{user.displayName}}</router-link>
      </div>
      <SignIn class="signin" />
    </div>
    <router-view id="content" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SignIn from '@/components/SignIn.vue'; // @ is an alias to /src
import user from './user';

export default Vue.extend({
  name: 'app',
  components: {
    SignIn,
  },
  data: () => ({
    user,
  }),
});
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Quicksand:500&display=swap');
@import './scss/_shared.scss';

*,
*:before,
*:after {
  box-sizing: inherit;
}

dd {
  font-weight: bold;
  margin: 0;
}

dd + dt {
  margin-top: 10px;
}

button {
  @include button($accent-color, $alt-accent-color);
}

.alert {
  background: #fcc;
  border-left: 4px solid #f77;
  padding: 5px;
}

html {
  min-height: 100%;
  display: flex;
  box-sizing: border-box;
}

body {
  font-family: 'Quicksand', Helvetica, Arial, sans-serif;
  line-height: 1.6;

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
  border-bottom: 1px solid $accent-color;
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
