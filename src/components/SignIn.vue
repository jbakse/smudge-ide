<template>
  <div id="sign-in">
    <template v-if="userInfo.loggedIn">
      <!-- <img class="user-photo" v-bind:src="userInfo.photoURL" /> -->
      <div class="user-display-name">{{userInfo.displayName}}</div>
      <!-- <button id="sign-out" v-on:click="signOut">Sign Out</button> -->
    </template>
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