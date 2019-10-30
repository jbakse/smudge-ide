<template>
  <div id="sign-in">
    <button v-if="userInfo.loggedIn" v-on:click="signOut">Sign Out</button>
    <button v-else v-on:click="signIn">Sign In</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import user from '../user';

export default Vue.extend({
  name: 'SignIn',
  props: {},

  data: () => ({
    userInfo: user.userInfo,
  }),
  methods: {
    signIn: user.signIn,
    signOut: user.signOut,
  },
});
</script>

<style scoped lang="scss">
</style>