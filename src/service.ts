import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCVB-d1UX3NbjuQ0uzrbj2hg7tLIkdFrj4',
  authDomain: 'family-tree-dccab.firebaseapp.com',
  projectId: 'family-tree-dccab',
  storageBucket: 'family-tree-dccab.appspot.com',
  messagingSenderId: '640000077296',
  appId: '1:640000077296:web:012df715adaabefcbdc135',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
