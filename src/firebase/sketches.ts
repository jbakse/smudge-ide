import { firebase } from '@/firebase/firebase';
import * as auth from '@/firebase/auth';

const db = firebase.firestore();
export const sketches = db.collection('sketches');

export type Sketch = {
  id: string; // document name added as non-enumerable prop by vuefire
  title: string;
  source: string;
  created: firebase.firestore.Timestamp;
  updated: firebase.firestore.Timestamp;
} | null;

const sketchTemplate = `// require https://cdn.jsdelivr.net/npm/p5@0.7.3/lib/p5.min.js
// Just a basic p5.js sketch.
function setup() {
  createCanvas(400, 400);
  background(50, 50, 50);
  noStroke();
}
function draw() {
  fill(255, 0, 0);
  ellipse(200, 200, 100, 100);
}`;

export function createSketch() {
  if (!auth.user.loggedIn) {
    return Promise.reject(new Error('User not logged in.'));
  }

  return sketches
    .add({
      ownerId: auth.user.uid,
      ownerUsername: auth.user.username,
      title: 'untitled',
      source: sketchTemplate,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      updated: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((err) => {
      console.log('error creating sketch', err);
      throw err;
    });
}

export function saveSketch(sketch: Sketch) {
  if (sketch == null) return Promise.reject(new Error('Sketch is "null".'));
  return sketches.doc(sketch.id).update({
    ...sketch,
    updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  // ... spread operator used to exclude id (it is non-enumerable)
}

export function deleteSketch(sketchId: string) {
  return sketches.doc(sketchId).delete();
}
