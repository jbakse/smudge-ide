import firebase from './firebase';
const db = firebase.firestore();
export const users = db.collection('users');

export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  photoURL: string;
} | null;
