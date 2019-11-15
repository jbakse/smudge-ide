<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">SmudgeJS</router-link>

      <div class="menu">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'users' }">Users</router-link>
      </div>

      <SignIn />
    </div>

    <router-view id="content" />

    <ui-snackbar-container class="snackbar-container" ref="snackbarContainer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as auth from '@/firebase/auth';
import * as snackbar from '@/snackbar';
import SignIn from '@/components/SignIn.vue';

export default Vue.extend({
  name: 'app',
  components: {
    SignIn,
  },
  data: () => ({
    auth,
  }),
  methods: {},
  mounted() {
    snackbar.setContainer(this.$refs.snackbarContainer);
  },
});
</script>

<style lang="scss" src="@/scss/_global.scss" />

<style lang="scss">
@import '@/scss/_shared.scss';

html {
  min-height: 100%;
  display: flex;
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
  padding: $vertical-margin * 0.5 0;

  border-bottom: 1px solid black;
  font-size: 20px;

  display: flex;
  justify-content: space-between;
  a {
    color: black;
    text-decoration: none;
  }
  .menu a.router-link-exact-active {
    color: $accent-color;
  }
  .menu a {
    margin: 0 30px;
  }
}
</style>
