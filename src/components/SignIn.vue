<template>
  <div id="sign-in">
    <!-- <button v-if="auth.loggedIn" v-on:click="signOut">Sign Out</button> -->
    <div v-if="auth.loggedIn" class="popover-trigger">
      {{auth.username}}
      <img class="user-photo" v-bind:src="auth.photoURL" />
      <ui-popover ref="dropdown" position="bottom-end">
        <ui-menu
          contain-focus
          disableRipple
          :options="menuOptions"
          @close="$refs.dropdown.close()"
          @select="select"
        ></ui-menu>
      </ui-popover>
    </div>
    <button v-else v-on:click="signIn">Sign In</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { auth } from '@/firebase/auth';

export default Vue.extend({
  name: 'SignIn',
  data: () => ({
    menuOptions,
    auth,
  }),
  methods: {
    signIn: auth.signIn,
    signOut: auth.signOut,
    select(option: any) {
      if (option.id === 'profile') {
        this.$router.push({
          name: 'user',
          params: { username: auth.username },
        });
      }
      if (option.id === 'sign-out') {
        this.signOut();
      }
    },
  },
});

const menuOptions = [
  {
    id: 'profile',
    label: 'Your Profile',
  },
  {
    id: 'sign-out',
    label: 'Sign Out',
  },
];
</script>

<style scoped lang="scss">
.user-photo {
  height: 30px;
  position: relative;
  top: 7px;
  border-radius: 15px;
  margin-left: 10px;
}
.popover-trigger {
  cursor: pointer;
}
</style>

</style>