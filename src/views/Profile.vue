<template>
    <div v-if="user" class="profile">
        <h1 v-if="user">About {{user.displayName}}</h1>
        <img class="user-photo" v-bind:src="user.photoURL" />
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default Vue.extend({
    name: 'Profile',
    props: {},

    data: () => ({
        user: null as (firebase.User | null),
    }),
    methods: {},
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = user;
        });
    },
});
</script>


<style scoped lang="scss">
.user-photo {
    border: solid #eee;
    border-width: 20px 20px 60px 20px;
}
</style>