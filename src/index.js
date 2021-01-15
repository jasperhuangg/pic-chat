import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase"

// ---- Step 0
// ---- Setup Firebase
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDM714yAUw9yYPgf_l4mBIejlY7_gvSHek",
  authDomain: "pic-chat-9d11d.firebaseapp.com",
  projectId: "pic-chat-9d11d",
  storageBucket: "pic-chat-9d11d.appspot.com",
  messagingSenderId: "147701791039",
  appId: "1:147701791039:web:bd9a63da04d968361e3b8a"
};
firebase.initializeApp(FIREBASE_CONFIG);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
