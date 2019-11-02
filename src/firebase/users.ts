import { firebase } from './firebase';
const db = firebase.firestore();
export const users = db.collection('users');

export type UserProfile = {
  id: string; // document name added as non-enumerable prop by vuefire
  username: string;
  displayName: string;
  photoURL: string;
} | null;

export function saveProfile(profile: UserProfile) {
  // @todo changing username needs to update username on sketches
  if (profile == null) return Promise.reject(new Error('Profile is "null".'));
  return users.doc(profile.id).update({ ...profile });
  // ... spread operator used to exclude id (it is non-enumerable)
}
