import { firebase } from './firebase';

import * as users from '@/firebase/users';
const db = firebase.firestore();
// const users = db.collection('users');

function generateUsername() {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let username = '';
  for (let i = 0; i < 10; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  return username;
}

class Auth {
  public ready: boolean = false;
  public loggedIn: boolean = false;
  public uid: string = '';
  public email: string | null = '';
  public username: string = '';
  public displayName: string = '';
  public photoURL: string = '';

  // private user: firebase.User | null;

  constructor() {
    // this.user = null;

    firebase.auth().onAuthStateChanged((newUser) => {
      this.ready = true;
      // this.user = newUser;
      if (newUser) {
        console.log('user signed in!');
        this.loggedIn = true;
        this.uid = newUser.uid;
        this.email = newUser.email;

        this.loadUserProfile(newUser);
        users.updateLastLogin(this.uid);
      } else {
        console.log('user signed out!');
        this.loggedIn = false;
        this.uid = '';
        this.email = '';
        this.username = '';
        this.displayName = '';
        this.photoURL = '';
      }
    });
  }

  public signIn() {
    console.log('Sign in');
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    // firebase.auth().signInWithPopup(provider);
  }

  public signOut() {
    firebase.auth().signOut();
  }

  private async loadUserProfile(newUser: firebase.User) {
    try {
      const userDoc = await users.users.doc(newUser.uid).get();

      if (!userDoc.exists) {
        // const username = await this.fetchUsername(); // displayName.replace(/\W/g, '');
        const username = (await fetchGithubUsername()) || generateUsername();
        // if (!username) {
        //   this.signOut();
        //   return;
        // }
        const displayName = newUser.displayName || username;
        const photoURL = newUser.photoURL || '';

        users.users.doc(this.uid).set({
          username,
          displayName,
          photoURL,
        });

        this.username = username;
        this.displayName = displayName;
        this.photoURL = photoURL;
      } else {
        this.username = userDoc.get('username');
        this.displayName = userDoc.get('displayName');
        this.photoURL = userDoc.get('photoURL');
      }
    } catch (err) {
      console.error('error getting user profile', err);
    }
  }
}

async function fetchGithubUsername(): Promise<string | undefined> {
  console.log('fetchUsername');
  try {
    const result = await firebase.auth().getRedirectResult();
    console.log('result', result);
    if (result.user === null) {
      // no redirect operation was called
      return undefined;
    }

    if (result.credential) {
      const token = (result.credential as any).accessToken;
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const json = await response.json();
      const login = json.login;
      return login;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    return undefined;
  }
}

const user = new Auth();

export { user };
