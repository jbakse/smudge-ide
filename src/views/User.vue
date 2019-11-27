<template>
  <div v-if="userProfile" class="user">
    <div class="header">
      <h1 class="display-name">
        <VeeInputAuto
          :disabled="!$can('write', userProfile)"
          label="display name"
          vid="displayName"
          rules="required|max:30|min:4"
          v-model="userProfile.displayName"
          @input="saveProfile"
        />
      </h1>

      <div class="owner-username">{{ userProfile.username }}</div>

      <div class="buttons">
        <button v-can="['write', userProfile]" v-on:click="createSketch">Create Sketch</button>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h2>Sketches</h2>
        <router-link
          v-for="sketch in sketches"
          v-bind:key="sketch.id"
          class="sketches-item"
          :to="{ name: 'sketch', params: { sketchId: sketch.id } }"
        >
          <span class="title">{{ sketch.title }}</span>
          <span class="updated hover-show">
            {{
            formatTime(sketch.updated)
            }}
          </span>
          <span class="updated hover-hide">
            {{
            relativeTime(sketch.updated)
            }}
          </span>
        </router-link>
      </div>

      <div class="column"></div>
    </div>
  </div>
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

  computed: {},

  methods: {
    formatTime(time: firestore.Timestamp) {
      return time && moment(time.seconds * 1000).format('YYYY-MM-DD h:mm:ss a');
    },

    relativeTime(time: firestore.Timestamp) {
      return time && moment(time.seconds * 1000).fromNow();
    },

    async saveProfile() {
      console.log('Save profile');
      if (!this.userProfile) return;
      users.saveProfile(this.userProfile).then(() => {
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

.user {
  margin-top: $vertical-margin;
}

.header {
  margin-bottom: $vertical-margin;
}

.display-name {
  width: 50%;
  margin: 0;
}

.username {
  width: 50%;
  font-weight: normal;
  font-size: 18px;
}

.buttons {
  margin-top: $vertical-margin;
  position: relative;
}

.user-photo {
  width: 100%;
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
