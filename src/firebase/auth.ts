import { firebase } from './firebase';

const db = firebase.firestore();
const users = db.collection('users');

function generateUsername() {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let username = '';
  for (let i = 0; i < 10; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  return username;
}

class Auth {
  public loggedIn: boolean = false;
  public uid: string = '';
  public email: string | null = '';
  public username: string = '';
  public displayName: string = '';
  public photoURL: string = '';

  private user: firebase.User | null;

  constructor() {
    this.user = null;

    firebase.auth().onAuthStateChanged((newUser) => {
      this.user = newUser;
      if (newUser) {
        console.log('user signed in!');

        this.loggedIn = true;
        this.uid = newUser.uid;
        this.email = newUser.email;

        this.loadUserProfile();
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
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  public signOut() {
    firebase.auth().signOut();
  }

  private loadUserProfile() {
    users
      .doc(this.uid)
      .get()
      .then((userDoc) => {
        if (!userDoc.exists && this.user) {
          const displayName = this.user.displayName || generateUsername();
          const username = displayName.replace(/\W/g, '');
          const photoURL = this.user.photoURL || '';
          users.doc(this.uid).set({
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
      })
      .catch((err) => {
        console.error('error getting user profile', err);
      });
  }
}

const auth = new Auth();

export { auth };
