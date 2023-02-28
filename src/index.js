import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBhd_TmWrUyv2kAPokA_WPPV0F5-Vn_Tnc",
  authDomain: "coderhouse-app-test.firebaseapp.com",
  projectId: "coderhouse-app-test",
  storageBucket: "coderhouse-app-test.appspot.com",
  messagingSenderId: "994301667499",
  appId: "1:994301667499:web:425d52ec34e421e6ceefee"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
