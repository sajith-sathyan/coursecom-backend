

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyArNwZAtc7l2CND37HpZo5EdUyef-Su4DQ",
  authDomain: "coursecom-2.firebaseapp.com",
  projectId: "coursecom-2",
  storageBucket: "coursecom-2.appspot.com",
  messagingSenderId: "405607593062",
  appId: "1:405607593062:web:7e958c2b4ba5b27794e9a7",
  measurementId: "G-JVFWT9VQJS"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database()
export const storage = firebase.storage()
export default firebase