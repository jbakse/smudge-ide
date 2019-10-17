<template>
    <div id="sign-in">
        <template v-if="user">
            <img class="user-photo" v-bind:src="user.photoURL" />
            <div class="user-display-name">{{user.displayName}}</div>
            <button id="sign-out" v-on:click="signOut">Sign Out</button>
        </template>
        <button v-else v-on:click="signIn">Sign In</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default Vue.extend({
    name: 'SignIn',
    props: {},

    data: () => ({
        user: null as (firebase.User | null),
    }),
    methods: {
        signIn() {
            const provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        },
        signOut() {
            const provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signOut();
        },
    },
    mounted() {
        const firebaseConfig = {
            apiKey: 'AIzaSyCOeKDUm4ZbUJhkIs1-qmvoRe4HnlsjzG8',
            authDomain: 'smudge-ide.firebaseapp.com',
            databaseURL: 'https://smudge-ide.firebaseio.com',
            projectId: 'smudge-ide',
            storageBucket: 'smudge-ide.appspot.com',
            messagingSenderId: '302457341437',
            appId: '1:302457341437:web:6705b6cac3491435804594',
        };
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user signed in!');
                console.log(user.displayName);
                console.log(user.photoURL);
                console.log(user);
            } else {
                console.log('user signed out!');
            }
            this.user = user;
        });
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#sign-in {
    display: flex;
    align-items: center;
}
.user-display-name {
    padding: 0 10px;
}
.user-photo {
    max-width: 64px;
    max-height: 64px;
}
#sign-out {
    height: 20px;
}
</style>
