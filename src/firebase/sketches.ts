import firebase from './firebase';
import user from './user';
const db = firebase.firestore();
export const sketches = db.collection('sketches');

export type Sketch = {
  id: string;
  title: string;
  source: string;
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
  if (!user.loggedIn) return Promise.reject(new Error('User not logged in'));
  return sketches
    .add({
      ownerId: user.uid,
      ownerUsername: user.username,
      title: 'untitled',
      source: sketchTemplate,
    })
    .catch((err) => {
      console.log('error creating sketch', err);
      throw err;
    });
}