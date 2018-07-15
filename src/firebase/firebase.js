import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyBZzdIZBs1bVUXTl8bv8O8_dJbucXNOMPg",
  authDomain: "pyshopnotes.firebaseapp.com",
  databaseURL: "https://pyshopnotes.firebaseio.com",
  projectId: "pyshopnotes",
  storageBucket: "pyshopnotes.appspot.com",
  messagingSenderId: "9325461917"
};

const devConfig = {
  apiKey: "AIzaSyBZzdIZBs1bVUXTl8bv8O8_dJbucXNOMPg",
  authDomain: "pyshopnotes.firebaseapp.com",
  databaseURL: "https://pyshopnotes.firebaseio.com",
  projectId: "pyshopnotes",
  storageBucket: "pyshopnotes.appspot.com",
  messagingSenderId: "9325461917"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
