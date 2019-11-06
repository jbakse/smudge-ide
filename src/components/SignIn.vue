<template>
  <div id="sign-in">
    <button v-if="auth.loggedIn" v-on:click="signOut">Sign Out</button>
    <button v-else v-on:click="signIn">Sign In</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { auth } from '@/firebase/auth';

export default Vue.extend({
  name: 'SignIn',
  data: () => ({
    auth,
  }),
  methods: {
    signIn: auth.signIn,
    signOut: auth.signOut,
  },
});
</script>

<style scoped lang="scss">
</style>