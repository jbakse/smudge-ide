should this be on every component that wants to know the user?

It seems silly, maybe I can have this happen on the App component, and subcomponents can access it?

```js
firebase.auth().onAuthStateChanged((user) => {
  this.user = user;
});
```
