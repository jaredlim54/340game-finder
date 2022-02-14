import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBohq1cd_O1uonQy8E7448tWy6qmCnFGW0",
  authDomain: "info-340-project-2-gamefinder.firebaseapp.com",
  projectId: "info-340-project-2-gamefinder",
  storageBucket: "info-340-project-2-gamefinder.appspot.com",
  messagingSenderId: "126894449744",
  appId: "1:126894449744:web:0fc717385b5315ff09dd55",
  measurementId: "G-FXGRTMW1TC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

