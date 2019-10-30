<template>
  <div class="view row">
    <div class="column">
      <h1>{{userProfile.displayName}}</h1>
      <div v-if="userProfile.username == userInfo.username" class="alert">This is you!</div>
      <dl>
        <dt>userProfile:</dt>
        <dd>
          <pre>{{userProfile}}</pre>
        </dd>
      </dl>
      <img class="user-photo" v-bind:src="userProfile.photoURL" />
    </div>
    <div class="column">
      <h1>Sketches</h1>

      <!-- <router-link
        v-for="sketch in sketches"
        v-bind:key="sketch.id"
        class="sketch"
        :to="{ name: 'sketch', params: {userID: userInfo.uid, sketchID: sketch.id}}"
      >{{ sketch.title }}</router-link>

      <button v-on:click="createSketch">Create Sketch</button>-->
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import user from '../user';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();
const users = db.collection('users');

export default Vue.extend({
  name: 'User',
  props: ['username'],

  data: () => ({
    userProfile: {},
    userInfo: user.userInfo,
    // sketches: null,
  }),

  watch: {
    username: {
      immediate: true,
      handler(username) {
        users
          .where('username', '==', this.username || '')
          .limit(1)
          .get()
          .then((userProfile) => {
            if (!userProfile.empty) {
              this.$bind('userProfile', userProfile.docs[0].ref);
            } else {
              console.error(`Profile for ${this.username} not found.`);
            }
          });
        // this.$bind('sketches', profiles.doc(uid).collection('sketches'));
      },
    },
  },

  methods: {
    //     createSketch() {
    //       if (!user.userInfo.loggedIn) return;
    //       db.collection('profiles')
    //         .doc(user.userInfo.uid)
    //         .collection('sketches')
    //         .add({
    //           title: 'untitled',
    //           content: `// require https://cdn.jsdelivr.net/npm/p5@0.7.3/lib/p5.min.js
    // // Just a basic p5.js sketch.
    // function setup() {
    //   createCanvas(400, 400);
    //   background(50, 50, 50);
    //   noStroke();
    // }
    // function draw() {
    //   fill(255, 0, 0);
    //   ellipse(200, 200, 100, 100);
    // }
    // `,
    //         })
    //         .then((docRef) => {
    //           this.$router.push({
    //             name: 'sketch',
    //             params: { userID: user.userInfo.uid, sketchID: docRef.id },
    //           });
    //         })
    //         .catch((error) => {
    //           console.log('error');
    //           console.log(error);
    //         });
    //     },
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


