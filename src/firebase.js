import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKOCsWKkDe1YG5MhZy9lLE76_H1fxRnhk",
  authDomain: "reactauthproject-5724b.firebaseapp.com",
  projectId: "reactauthproject-5724b",
  storageBucket: "reactauthproject-5724b.appspot.com",
  messagingSenderId: "812703702032",
  appId: "1:812703702032:web:be41fa6bdd25b32aa97e95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
