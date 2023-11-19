// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFRpkUafqmt7xx_MC0oLhED998beN0hB4',
  authDomain: 'ls-digital-47.firebaseapp.com',
  projectId: 'ls-digital-47',
  storageBucket: 'ls-digital-47.appspot.com',
  messagingSenderId: '746059789984',
  appId: '1:746059789984:web:c1ff54e459f2d5137fbbc5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
