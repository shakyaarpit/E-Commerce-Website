import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlxiEmGBguApS2NsZvkTHn4Fl63RwQTzs",
  authDomain: "ecom-423a5.firebaseapp.com",
  projectId: "ecom-423a5",
  storageBucket: "ecom-423a5.appspot.com",
  messagingSenderId: "638399126483",
  appId: "1:638399126483:web:4d7874f04945afb48d6d26",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
