console.log("Hello, Smudge IDE");
var provider = new firebase.auth.GithubAuthProvider();
firebase.auth().signInWithRedirect(provider);
