<template>
  <div class="page profile">
    <template v-if="user">
      <h1>{{user.displayName}}</h1>
      <p>User ID: {{user.uid}}</p>
      <p>User Email: {{user.email}}</p>

      <h1>Sketches</h1>
      <ul class="sketches">
        <li v-for="sketch in sketches" v-bind:key="sketch.id">
          <router-link
            :to="{ name: 'sketch', params: {uid: user.uid, id: sketch.id}}"
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
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const db = firebase.firestore();
const profiles = db.collection('profiles');

export default Vue.extend({
  name: 'Profile',
  props: {},

  data: () => ({
    user: null as (firebase.User | null),
    profile: null,
    sketches: null,
  }),

  watch: {
    user: {
      immediate: true,
      handler(user) {
        if (user) {
          this.$bind('profile', profiles.doc(user.uid));
          this.$bind('sketches', profiles.doc(user.uid).collection('sketches'));
          console.log(
            'collection',
            profiles.doc(user.uid).collection('sketches').id
          );
        }
      },
    },
  },

  methods: {
    createSketch() {
      const uid = (this.user as firebase.User).uid;
      db.collection('profiles')
        .doc(uid)
        .collection('sketches')
        .add({
          title: 'untitled',
          content: '// Hello, SmudgeJS!',
        });
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    });
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


