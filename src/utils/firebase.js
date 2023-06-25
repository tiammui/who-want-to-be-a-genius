// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD-oOO5rKM-kfaFywtWdM71pXnrsP2jrug',
  authDomain: 'criterion-c7012.firebaseapp.com',
  projectId: 'criterion-c7012',
  storageBucket: 'criterion-c7012.appspot.com',
  messagingSenderId: '1032230569559',
  appId: '1:1032230569559:web:5dc65e2ef7a0f4f9ec4512',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function register(form) {
  await addDoc(collection(db, 'geniuscompetition'), {...form});
}
