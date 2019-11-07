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
// @import url('https://fonts.googleapis.com/css?family=Quicksand:500&display=swap');
@font-face {
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-display: auto;
  src: url(https://fonts.gstatic.com/s/quicksand/v19/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkM0o58a-xDwxUD2GFw.woff)
    format('woff');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/quicksand/v19/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkM0o58i-xDwxUD2GF9Zc.woff)
    format('woff');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

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
