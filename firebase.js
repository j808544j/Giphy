import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt8FmpkgKaL9bjdwdVr18QUmP8w6Bit_Y",
  authDomain: "auth-479ee.firebaseapp.com",
  projectId: "auth-479ee",
  storageBucket: "auth-479ee.appspot.com",
  messagingSenderId: "85975258515",
  appId: "1:85975258515:web:4f99b52357079c3cf54466",
};

const app = initializeApp(firebaseConfig);
export default app;
