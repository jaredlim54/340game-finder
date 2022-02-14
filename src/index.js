import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy7rUvwrZVwMY4PF98E8r5Pbq0P23c-aA",
  authDomain: "gamefinder-8cc38.firebaseapp.com",
  projectId: "gamefinder-8cc38",
  storageBucket: "gamefinder-8cc38.appspot.com",
  messagingSenderId: "93596669578",
  appId: "1:93596669578:web:e630497833b39cd12eff73",
  measurementId: "G-0YL0T5BSTK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

