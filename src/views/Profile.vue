<template>
    <div v-if="user" class="profile">
        <h1 v-if="user">About {{user.displayName}}</h1>
        <img class="user-photo" v-bind:src="user.photoURL" />
        <button v-on:click="createSketch">Create Sketch</button>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const db = firebase.firestore();
const users = db.collection('users');

console.log('db', db);

export default Vue.extend({
    name: 'Profile',
    props: {},

    data: () => ({
        user: null as (firebase.User | null),
        users: [],
    }),

    firestore: {
        users: users,
    },

    methods: {
        createSketch() {
            users.add({
                title: 'untitled',
                content: '',
            });
        },
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            this.user = user;
        });
    },
});

/*

users[
    {
        sketches: [
            title: "untitled"
            content: ""
        ]
    }
]

*/
</script>


<style scoped lang="scss">
.user-photo {
    border: solid #eee;
    border-width: 20px 20px 60px 20px;
}
</style>


