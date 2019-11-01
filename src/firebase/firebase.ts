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

export { firebase };
