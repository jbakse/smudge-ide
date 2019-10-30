import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
const db = firebase.firestore();
const users = db.collection('users');

interface UserInfo {
  loggedIn: boolean;
  uid: string;
  email: string | null;
  username: string;
  displayName: string | null;
  photoURL: string | null;
}

class User {
  public userInfo: UserInfo;
  private user: firebase.User | null;

  constructor() {
    this.user = null;
    this.userInfo = {
      loggedIn: false,
      uid: '',
      username: '',
      displayName: '',
      email: '',
      photoURL: '',
    };

    firebase.auth().onAuthStateChanged((newUser) => {
      if (newUser) {
        console.log('user signed in!');
        this.userInfo.loggedIn = true;
        this.userInfo.uid = newUser.uid;
        this.userInfo.email = newUser.email;
        this.loadUserProfile();
      } else {
        console.log('user signed out!');
        this.userInfo.loggedIn = false;
        this.userInfo.uid = '';
        this.userInfo.email = '';
        this.userInfo.username = '';
        this.userInfo.displayName = '';
        this.userInfo.photoURL = '';
      }
      this.user = newUser;
    });
  }

  public signIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  public signOut() {
    firebase.auth().signOut();
  }

  private loadUserProfile() {
    users
      .doc(this.userInfo.uid)
      .get()
      .then((userDoc) => {
        if (!userDoc.exists && this.user) {
          const displayName = this.user.displayName || generateUsername();
          const username = displayName.replace(/\W/g, '');

          users.doc(this.userInfo.uid).set({
            username,
            displayName,
            photoURL: this.user.photoURL,
          });

          this.userInfo.username = username;
          this.userInfo.displayName = displayName;
          this.userInfo.photoURL = this.user.photoURL;
        } else {
          this.userInfo.username = userDoc.get('username');
          this.userInfo.displayName = userDoc.get('displayName');
          this.userInfo.photoURL = userDoc.get('photoURL');
        }
      })
      .catch((err) => {
        console.error('error getting user profile', err);
      });
  }
}

const user = new User();
export default user;

function generateUsername() {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let username = '';
  for (let i = 0; i < 10; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  return username;
}
