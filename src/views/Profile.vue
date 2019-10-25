<template>
  <div v-if="userInfo.loggedIn" class="view profile row">
    <div class="column">
      <h1>{{userInfo.displayName}}</h1>
      <dl>
        <dt>User ID</dt>
        <dd>{{userInfo.uid}}</dd>
        <dt>User Email</dt>
        <dd>{{userInfo.email}}</dd>
      </dl>
      <img class="user-photo" v-bind:src="userInfo.photoURL" />
    </div>
    <div class="column">
      <h1>Sketches</h1>

      <router-link
        v-for="sketch in sketches"
        v-bind:key="sketch.id"
        class="sketch"
        :to="{ name: 'sketch', params: {userID: userInfo.uid, sketchID: sketch.id}}"
      >{{ sketch.title }}</router-link>

      <button v-on:click="createSketch">Create Sketch</button>
    </div>
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
  props: ['userID'],

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
      if (!user.userInfo.loggedIn) return;
      db.collection('profiles')
        .doc(user.userInfo.uid)
        .collection('sketches')
        .add({
          title: 'untitled',
          content: `// require https://cdn.jsdelivr.net/npm/p5@0.7.3/lib/p5.min.js

// Just a basic p5.js sketch.

function setup() {
  createCanvas(400, 400);
  background(50, 50, 50);
  noStroke();
}

function draw() {
  fill(255, 0, 0);
  ellipse(200, 200, 100, 100);
}
`,
        })
        .then((docRef) => {
          this.$router.push({
            name: 'sketch',
            params: { userID: user.userInfo.uid, sketchID: docRef.id },
          });
        })
        .catch((error) => {
          console.log('error');
          console.log(error);
        });
    },
  },
});
</script>


<style scoped lang="scss">
@import '../scss/_shared.scss';

.user-photo {
  width: 100%;
}

.sketch {
  @include button($utility-color, $alt-accent-color);
  display: block;
}
</style>


