import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_S8dRYbGIk_wfbs6c6BgdMgnHkyFPb6w",
  authDomain: "intranetpartikular.firebaseapp.com",
  projectId: "intranetpartikular",
  storageBucket: "intranetpartikular.appspot.com",
  messagingSenderId: "501177411000",
  appId: "1:501177411000:web:636fbf756eb09ab2291b4d",
  measurementId: "G-96N3R64B0J",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, googleAuthProvider, db, storage };
