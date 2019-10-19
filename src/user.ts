import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCOeKDUm4ZbUJhkIs1-qmvoRe4HnlsjzG8',
  authDomain: 'smudge-ide.firebaseapp.com',
  databaseURL: 'https://smudge-ide.firebaseio.com',
  projectId: 'smudge-ide',
  storageBucket: 'smudge-ide.appspot.com',
  messagingSenderId: '302457341437',
  appId: '1:302457341437:web:6705b6cac3491435804594',
};

interface UserInfo {
  loggedIn: boolean;
  uid: string;
  email: string | null;
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
      displayName: '',
      email: '',
      photoURL: '',
    };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((newUser) => {
      if (newUser) {
        console.log('user signed in!');

        this.userInfo.loggedIn = true;
        this.userInfo.uid = newUser.uid;
        this.userInfo.email = newUser.email;
        this.userInfo.displayName = newUser.displayName;
        this.userInfo.photoURL = newUser.photoURL;
      } else {
        console.log('user signed out!');

        this.userInfo.loggedIn = false;
        this.userInfo.uid = '';
        this.userInfo.email = '';
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
}

const user = new User();
export default user;
