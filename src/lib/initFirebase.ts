import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'AIzaSyAEsIYHkCiGdIOWEcUnLvBA9hNdlnjMYkI',
  authDomain: 'woop-scholarship-portal.firebaseapp.com',
  databaseURL:
    'https://woop-scholarship-portal-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'woop-scholarship-portal',
  storageBucket: 'woop-scholarship-portal.appspot.com',
  messagingSenderId: '458551608269',
  appId: '1:458551608269:web:1d858c20a759ffb7cb3a84',
  measurementId: 'G-NJE3PS07LP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;


