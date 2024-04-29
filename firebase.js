// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore, initializeFirestore, memoryLocalCache } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app, {localCache: memoryLocalCache()})
// export const DB = getFirestore(app)
try {
  enableIndexedDbPersistence(DB);
  console.log("IndexedDB persistence enabled");
} catch (error) {
  if (error.code === 'failed-precondition') {
    console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (error.code === 'unimplemented') {
    console.log('The current browser does not support all of the features required to enable persistence.');
  }
}