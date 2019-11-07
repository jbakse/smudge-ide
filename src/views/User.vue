<template>
  <div class="view user">
    <template v-if="userProfile">
      <div class="header">
        <div>
          <ValidationObserver ref="observer" v-slot="{ pristine, invalid }">
            <h1 class="display-name">
              <VeeInput
                :disabled="!$can('write', userProfile)"
                label="display name"
                vid="displayName"
                rules="max:30|min:4"
                v-model="userProfile.displayName"
              />
            </h1>

            <h2 class="username">
              <VeeInput
                :disabled="!$can('write', userProfile)"
                label="username"
                vid="username"
                rules="max:20|min:4"
                v-model="userProfile.username"
              />
            </h2>
            <!-- <h1 class="display-name">
              <ValidationProvider
                name="display name"
                rules="max:30|min:4"
                v-slot="{ errors, classes }"
              >
                <input
                  v-model="userProfile.displayName"
                  v-can.disable="['write', userProfile]"
                  class="inherit title"
                  :class="classes"
                />
                <ValidationErrors :errors="errors" />
              </ValidationProvider>
            </h1>-->

            <!-- <h2 class="username">
              <ValidationProvider name="username" rules="max:20|min:4" v-slot="{ errors, classes }">
                <input
                  v-can.disable="['write', userProfile]"
                  class="inherit title"
                  v-model="userProfile.username"
                />
                <ValidationErrors :errors="errors" />
              </ValidationProvider>
            </h2>-->
            <div v-can="['write', userProfile]">
              <button
                :class="{text: pristine || invalid}"
                :disabled="pristine || invalid"
                @click="saveProfile"
              >Save Profile</button>
            </div>
          </ValidationObserver>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <h2>Profile</h2>
          <img class="user-photo" v-bind:src="userProfile.photoURL" />
        </div>
        <div class="column">
          <h2>Sketches</h2>

          <router-link
            v-for="sketch in sketches"
            v-bind:key="sketch.id"
            class="sketch sketches-item"
            :to="{ name: 'sketch', params: {sketchId: sketch.id}}"
          >
            <span class="title">{{ sketch.title }}</span>
            <span class="updated">{{ formatTime(sketch.updated) }}</span>
          </router-link>

          <button v-can="['write', userProfile]" v-on:click="createSketch">Create Sketch</button>
        </div>
      </div>
    </template>
    <template v-else>
      <h1>No user named {{username}}</h1>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { auth } from '@/firebase/auth';
import { firebase } from '@/firebase/firebase';
import { users, UserProfile, saveProfile } from '@/firebase/users';
import { sketches, Sketch, createSketch } from '@/firebase/sketches';
import { firestore } from 'firebase';

export default Vue.extend({
  name: 'User',
  props: ['username'],

  data: () => ({
    auth,
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
          sketches
            .where('ownerId', '==', this.userProfile.id)
            .orderBy('updated', 'desc')
        );
      },
    },
  },

  methods: {
    formatTime(time: firestore.Timestamp) {
      return time && new Date(time.seconds * 1000).toLocaleString();
    },

    async saveProfile() {
      const isValid = await (this.$refs.observer as any).validate();
      if (!isValid) {
        console.error('form not valid!');
        return;
      }
      saveProfile(this.userProfile).then(() => {
        console.log('saved');
        requestAnimationFrame(() => {
          (this.$refs.observer as any).reset();
        });
        // this.dirty = false;
      });
    },
    createSketch() {
      this.$unbind('sketches', false);
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
@import '@/scss/_shared.scss';

.user-photo {
  width: 100%;
}

.sketch {
  @include button(#eee);
  display: block;
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
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  .updated {
    color: #aaa;
  }
}
</style>


