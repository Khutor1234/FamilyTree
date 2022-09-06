import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCVB-d1UX3NbjuQ0uzrbj2hg7tLIkdFrj4',
  authDomain: 'family-tree-dccab.firebaseapp.com',
  projectId: 'family-tree-dccab',
  storageBucket: 'family-tree-dccab.appspot.com',
  messagingSenderId: '640000077296',
  appId: '1:640000077296:web:012df715adaabefcbdc135',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const authProvider = new firebase.auth.GoogleAuthProvider();
const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);

export { db, auth, authProvider, firebaseApp, reduxSagaFirebase };
