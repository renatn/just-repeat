import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAJlVh2tEWXKuUGoeI3OqV4L-Dw8Vm4gSk",
  authDomain: "flashcards-8071c.firebaseapp.com",
  databaseURL: "https://flashcards-8071c.firebaseio.com",
  storageBucket: "flashcards-8071c.appspot.com",
};

export const initFirebase = (handleAuthState) => {

  firebase.initializeApp(config);
  const database = firebase.database();

  const connectedRef = database.ref(".info/connected");
  connectedRef.on('value', (snap) => {
    if (snap.val() === true) {
      console.log('Firebase: connected');
    } else {
      console.log('Firebase: not connected');
    }
  });

  firebase.auth().onAuthStateChanged(handleAuthState);
};

export const signIn = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log('Success', user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(error);
  });
};

export const signOut = () => {
  firebase.auth().signOut().then(function() {
    console.log('Signout success');
  }, function(error) {
    console.log('Signout', error);
  });
};


export const saveToFirebase = (userId, decks) =>
  firebase.database().ref('decks/' + userId).set({decks});

export const loadFromFirebase = (userId) =>
  firebase.database().ref('decks/' + userId).once('value');
