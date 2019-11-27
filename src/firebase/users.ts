import { firebase } from './firebase';

const db = firebase.firestore();
export const users = db.collection('users');

export interface UserProfile {
  id: string; // document name added as non-enumerable prop by vuefire
  username: string;
  displayName: string;
  photoURL: string;
  lastLogin: firebase.firestore.Timestamp;
}

export function saveProfile(profile: UserProfile) {
  // @todo changing username needs to update username on sketches
  // if (profile == null) return Promise.reject(new Error('Profile is "null".'));

  return users.doc(profile.id).update({ ...profile });
  // ... spread operator used to exclude id (it is non-enumerable)
}

export function updateLastLogin(userId: string) {
  return users.doc(userId).update({
    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
  });
}
