<template>
  <div class="view profile columns">
    <div class="column">
      <template v-if="userInfo.loggedIn">
        <h1>{{userInfo.displayName}}</h1>
        <dl>
          <dt>User ID</dt>
          <dd>{{userInfo.uid}}</dd>
          <dt>User Email</dt>
          <dd>{{userInfo.email}}</dd>
        </dl>
        <img class="user-photo" v-bind:src="userInfo.photoURL" />
      </template>
      <template v-else>
        <h1>Sign In</h1>
      </template>
    </div>
    <div class="column">
      <h1>Sketches</h1>
      <ul class="sketches">
        <li v-for="sketch in sketches" v-bind:key="sketch.id">
          <router-link
            :to="{ name: 'sketch', params: {userID: userInfo.uid, sketchID: sketch.id}}"
          >{{ sketch.title }}</router-link>
        </li>
      </ul>
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
          content: '// Hello, SmudgeJS!',
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
.user-photo {
  max-width: 100%;
}

dd + dt {
  margin-top: 10px;
}

dd {
  font-weight: bold;
  margin: 0;
}

.sketches {
  padding-left: 0;
}

.sketches li {
  list-style: none;

  a {
    display: block;
    color: black;
    text-decoration: none;
    background: #ccc;
    box-sizing: border-box;
    &:hover {
      background: #acc;
    }
    margin-bottom: 5px;
    padding: 3px 10px;
    border-radius: 6px;
    width: 100%;
  }
}
</style>


