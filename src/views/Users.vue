<template>
  <div class="view users">
    <template v-if="users.length">
      <h1>Users</h1>
      <router-link
        class="user"
        v-for="user in users"
        v-bind:key="user.username"
        :to="{ name: 'user', params: {username: user.username}}"
      >{{user.username}}</router-link>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { users } from '@/firebase/users';

export default Vue.extend({
  name: 'Users',
  firestore: {
    users: users.orderBy('username').limit(30),
  },
  data: () => ({
    users: [],
  }),
});
</script>


<style scoped lang="scss">
@import '@/scss/_shared.scss';

.user {
  @include button(#eee);
  display: block;
}
</style>


