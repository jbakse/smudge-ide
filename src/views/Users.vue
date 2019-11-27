<template>
  <div class="view users">
    <h1>Users</h1>
    <template v-if="users.length">
      <router-link
        class="user"
        v-for="user in users"
        v-bind:key="user.username"
        :to="{ name: 'user', params: {username: user.username}}"
      >{{user.username}}</router-link>

      <div class="buttons">
        <button @click="more">Show More</button>
      </div>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import * as users from '@/firebase/users';

export default Vue.extend({
  name: 'Users',
  firestore: {
    users: users.users.orderBy('username').limit(50),
  },
  // watch: {
  //   pageNumber: {
  //     immediate: true,
  //     handler() {
  //       console.log(this.pageNumber);
  //       this.$bind(
  //         'users',
  //         users
  //           .orderBy('username')
  //           .limit(2)
  //           .startAt(null)
  //       );
  //     },
  //   },
  // },
  data: () => ({
    users: [] as users.UserProfile[],
    pageNumber: 0,
  }),
  computed: {
    pageCount() {
      return 3;
    },
  },
  methods: {
    more() {
      const lastUser = this.users[this.users.length - 1];
      this.$bind(
        'users',
        users.users
          .orderBy('username')
          .limit(50)
          .startAfter(lastUser.username)
      );
    },
  },
});
</script>


<style scoped lang="scss">
@import '@/scss/_shared.scss';

.user {
  @include button(#eee);
  display: block;
}
</style>


