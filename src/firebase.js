import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB9n8pPUvrvA9TqZ1QODanC9ECIlxVFisg",
  authDomain: "muvup-c1683.firebaseapp.com",
  projectId: "muvup-c1683",
  storageBucket: "muvup-c1683.appspot.com",
  messagingSenderId: "482344058387",
  appId: "1:482344058387:web:326cad52a5fa0afa0249e6",
  measurementId: "G-3KN4KQMWGZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);