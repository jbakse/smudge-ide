import { firebase } from './firebase';
const db = firebase.firestore();
export const users = db.collection('users');

export type UserProfile = {
  id: string; // document name added as non-enumerable prop by vuefire
  username: string;
  displayName: string;
  photoURL: string;
} | null;
