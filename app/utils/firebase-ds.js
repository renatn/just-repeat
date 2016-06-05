import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAJlVh2tEWXKuUGoeI3OqV4L-Dw8Vm4gSk",
  authDomain: "flashcards-8071c.firebaseapp.com",
  databaseURL: "https://flashcards-8071c.firebaseio.com",
  storageBucket: "flashcards-8071c.appspot.com",
};
firebase.initializeApp(config);

const database = firebase.database();
const connectedRef = database.ref(".info/connected");
connectedRef.on('value', (snap) => {
  if (snap.val() === true) {
    console.log('Firebas: connected');
  } else {
    console.log('Firebase: not connected');
  }
});

const decksRef = firebase.database().ref().child('decks');
