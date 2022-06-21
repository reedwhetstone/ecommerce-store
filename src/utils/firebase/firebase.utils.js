/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1vqRKPPTSZx_rlfJy0VVYnay03BoNgU8',
  authDomain: 'e-comm-db-6da42.firebaseapp.com',
  projectId: 'e-comm-db-6da42',
  storageBucket: 'e-comm-db-6da42.appspot.com',
  messagingSenderId: '77942903219',
  appId: '1:77942903219:web:f6a997576acfebb241bbc6',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
