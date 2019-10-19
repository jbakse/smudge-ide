<template>
  <div class="page profile">
    <template v-if="userInfo.loggedIn">
      <h1>{{userInfo.displayName}}</h1>
      <p>User Id: {{userInfo.uid}}</p>
      <p>User Email: {{userInfo.email}}</p>

      <h1>Sketches</h1>
      <ul class="sketches">
        <li v-for="sketch in sketches" v-bind:key="sketch.id">
          <router-link
            :to="{ name: 'sketch', params: {uid: userInfo.uid, id: sketch.id}}"
          >{{ sketch.title }}—{{sketch.id}}</router-link>
        </li>
      </ul>
      <button v-on:click="createSketch">Create Sketch</button>
    </template>
    <template v-else>
      <h1>Sign In</h1>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import user from '../user';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();
const profiles = db.collection('profiles');

export default Vue.extend({
  name: 'Profile',
  props: {},

  data: () => ({
    userInfo: user.userInfo,
    profile: null,
    sketches: null,
  }),

  watch: {
    'userInfo.uid': {
      immediate: true,
      handler(uid) {
        if (uid) {
          this.$bind('profile', profiles.doc(uid));
          this.$bind('sketches', profiles.doc(uid).collection('sketches'));
        }
      },
    },
  },

  methods: {
    createSketch() {
      if (user.userInfo.loggedIn) return;
      db.collection('profiles')
        .doc(user.userInfo.uid)
        .collection('sketches')
        .add({
          title: 'untitled',
          content: '// Hello, SmudgeJS!',
        });
    },
  },
});
</script>


<style scoped lang="scss">
.profile {
  padding: 5px;
}
.user-photo {
  max-width: 64px;
  max-height: 64px;
}
</style>


