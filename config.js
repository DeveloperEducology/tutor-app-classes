import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnQJhNzPILgrPrmDDgRywM-6unRp6gz1s",
  authDomain: "fir-learning-29cf4.firebaseapp.com",
  databaseURL: "https://fir-learning-29cf4-default-rtdb.firebaseio.com",
  projectId: "fir-learning-29cf4",
  storageBucket: "fir-learning-29cf4.appspot.com",
  messagingSenderId: "711378401773",
  appId: "1:711378401773:web:c6a2f7fb0eb612c42f4fe4",
  measurementId: "G-SY8QEWCC1R",
};


  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { firebase, auth, };

