console.log("Hello, Smudge IDE");

document.getElementById("sign-in").onclick = () => {
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

document.getElementById("sign-out").onclick = () => {
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signOut();
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("user signed in!");
    console.log(user.displayName);
    console.log(user.email);
    console.log(user.emailVerified);
    console.log(user.photoURL);
    console.log(user.isAnonymous);
    console.log(user.uid);
    console.log(user.providerData);
    console.log(user);

    document.getElementById("greeting").innerText = `Hello ${user.displayName}`;
    let userPhoto = document.createElement("img");
    userPhoto.src = user.photoURL;
    document.getElementById("user-photo").append(userPhoto);
  } else {
    console.log("user signed out!");
    document.getElementById("greeting").innerText = `Please sign in!`;
    // User is signed out.
  }
});
