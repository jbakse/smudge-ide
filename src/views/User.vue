<template>
  <ValidationObserver
    v-if="userProfile"
    class="user"
    ref="observer"
    v-slot="{ dirty, invalid }"
  >
    <div class="header">
      <h1 class="display-name">
        <VeeInput
          :disabled="!$can('write', userProfile)"
          label="display name"
          vid="displayName"
          rules="required|max:30|min:4"
          v-model="userProfile.displayName"
        />
      </h1>

      <h2 class="username">
        <VeeInput
          :disabled="!$can('write', userProfile)"
          label="username"
          vid="username"
          rules="required|max:20|min:4"
          v-model="userProfile.username"
        />
      </h2>

      <button
        v-if="$can('write', userProfile)"
        :class="{ invalid }"
        :disabled="!dirty || invalid"
        @click="saveProfile"
      >
        Save Profile
      </button>
    </div>
    <div class="row">
      <div class="column">
        <h2>Profile</h2>
        <img class="user-photo" v-bind:src="userProfile.photoURL" />
      </div>
      <div class="column">
        <h2>Sketches</h2>
        <input
          type="search"
          placeholder="search"
          v-model="sketchQuery"
          class="search"
        />
        <router-link
          v-for="sketch in filteredSketches"
          v-bind:key="sketch.id"
          class="sketches-item"
          :to="{ name: 'sketch', params: { sketchId: sketch.id } }"
        >
          <span class="title">{{ sketch.title }}</span>
          <span class="updated hover-show">{{
            formatTime(sketch.updated)
          }}</span>
          <span class="updated hover-hide">{{
            relativeTime(sketch.updated)
          }}</span>
        </router-link>

        <button v-can="['write', userProfile]" v-on:click="createSketch">
          Create Sketch
        </button>
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import _ from 'lodash';
import moment from 'moment';
import Vue from 'vue';
import { firestore } from 'firebase';

import * as users from '@/firebase/users';
import * as sketches from '@/firebase/sketches';
import * as snackbar from '@/snackbar';

export default Vue.extend({
  name: 'User',

  props: ['username'],

  data: () => ({
    sketchQuery: '',
    userProfile: null as users.UserProfile | null,
    sketches: {} as sketches.Sketch,
  }),

  watch: {
    username: {
      immediate: true,
      handler() {
        console.log('watch username');
        users.users
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
      handler() {
        if (!this.userProfile) return;
        this.$bind(
          'sketches',
          sketches.sketches
            .where('ownerId', '==', this.userProfile.id)
            .orderBy('updated', 'desc')
        );
      },
    },
  },

  computed: {
    filteredSketches() {
      return _.filter(this.sketches, (s: any) =>
        s.title.toLowerCase().includes(this.sketchQuery.toLowerCase())
      );
    },
  },

  methods: {
    formatTime(time: firestore.Timestamp) {
      return time && moment(time.seconds * 1000).format('YYYY-MM-DD h:mm:ss a');
    },

    relativeTime(time: firestore.Timestamp) {
      return time && moment(time.seconds * 1000).fromNow();
    },

    async saveProfile() {
      if (!this.userProfile) return;
      const isValid = await (this.$refs.observer as any).validate();
      if (!isValid) {
        console.error('form not valid!');
        return;
      }
      users.saveProfile(this.userProfile).then(() => {
        console.log('saved');
        requestAnimationFrame(() => {
          (this.$refs.observer as any).reset();
        });
        snackbar.show('Profile Saved!');
      });
    },

    createSketch() {
      this.$unbind('sketches', false);
      sketches
        .createSketch()
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
@import '@/scss/_shared.scss';

.user-photo {
  width: 100%;
}

.display-name {
  width: 50%;
}

.username {
  width: 25%;
  font-weight: normal;
  font-size: 18px;
}

.sketches-item {
  @include button(#eee);
  display: block;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  .updated {
    color: #aaa;
  }
}

.hover-show {
  display: none;
  :hover > & {
    display: block;
  }
}

.hover-hide {
  display: block;
  :hover > & {
    display: none;
  }
}
</style>
