import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhd_TmWrUyv2kAPokA_WPPV0F5-Vn_Tnc",
    authDomain: "coderhouse-app-test.firebaseapp.com",
    projectId: "coderhouse-app-test",
    storageBucket: "coderhouse-app-test.appspot.com",
    messagingSenderId: "994301667499",
    appId: "1:994301667499:web:425d52ec34e421e6ceefee"
  };
  
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);