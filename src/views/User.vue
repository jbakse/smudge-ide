<template>
  <div class="view row">
    <template v-if="userProfile">
      <div class="column">
        <h1>{{userProfile.displayName}}</h1>
        <div v-if="userProfile.id == user.uid" class="alert">This is you!</div>
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

        <router-link
          v-for="sketch in sketches"
          v-bind:key="sketch.id"
          class="sketch"
          :to="{ name: 'sketch', params: {sketchId: sketch.id}}"
        >{{ sketch.title }}</router-link>

        <button v-if="userProfile.id == user.uid" v-on:click="createSketch">Create Sketch</button>
      </div>
    </template>
    <template v-else>
      <h1>No user named {{username}}</h1>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import user from '@/firebase/user';

// @todo import *
import { users, UserProfile } from '@/firebase/users';
import { sketches, Sketch, createSketch } from '@/firebase/sketches';

export default Vue.extend({
  name: 'User',
  props: ['username'],

  data: () => ({
    user,
    userProfile: {} as UserProfile,
    sketches: {} as Sketch,
  }),

  watch: {
    username: {
      immediate: true,
      handler() {
        users
          .where('username', '==', this.username)
          .limit(1) // @todo enforce username uniqueness backend + frontend
          .get()
          .then((userProfile) => {
            if (!userProfile.empty) {
              this.$bind('userProfile', userProfile.docs[0].ref);
            } else {
              this.userProfile = null;
            }
          });
      },
    },
    'userProfile.id': {
      immediate: true,
      handler() {
        if (!(this.userProfile && this.userProfile.id)) return;
        this.$bind(
          'sketches',
          sketches.where('ownerId', '==', this.userProfile.id)
        );
      },
    },
  },

  methods: {
    createSketch() {
      createSketch()
        .then((docRef) => {
          this.$router.push({
            name: 'sketch',
            params: { sketchId: docRef.id },
          });
        })
        .catch((err) => {
          console.log('error creating sketch outer', err);
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


