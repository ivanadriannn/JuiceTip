import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaVCdZUYujyH1vR0Nguq_XS003JdPBxi0",
  authDomain: "juicetip-chat.firebaseapp.com",
  projectId: "juicetip-chat",
  storageBucket: "juicetip-chat.appspot.com",
  messagingSenderId: "817383694538",
  appId: "1:817383694538:web:9e326ef9a4566fb4385433"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage();
export const db = getFirestore()