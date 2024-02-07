import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DB_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDmz-ZCAP9FapLpNZyITnxS73sDc7Nx9oQ",
  authDomain: "restaurantapp-174d6.firebaseapp.com",
  databaseURL: "https://restaurantapp-174d6-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-174d6",
  storageBucket: "restaurantapp-174d6.appspot.com",
  messagingSenderId: "615592132475",
  appId: "1:615592132475:web:84a588a39e95b7a21007de",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage, firebaseConfig };
