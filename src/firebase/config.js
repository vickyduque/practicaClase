// Import the functions you need from the SDKs you need
import app from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//ACA USEN LA CONFIGURACION QUE LES PROVEE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyB9ySA0smAZfc37kmF_W6Uu4LeobJgRhps",
  authDomain: "clase-18---auth-flow.firebaseapp.com",
  projectId: "clase-18---auth-flow",
  storageBucket: "clase-18---auth-flow.appspot.com",
  messagingSenderId: "285679580712",
  appId: "1:285679580712:web:9a632efb1c67385cffe71d"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const storage = app.storage();
export const auth = firebase.auth();
export const db = app.firestore();