import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmz9FpNCDmSNP7l6B5QdJ_EiqK6CBafDU",
  authDomain: "plastic-detection-598e8.firebaseapp.com",
  databaseURL: "https://plastic-detection-598e8-default-rtdb.firebaseio.com",
  projectId: "plastic-detection-598e8",
  storageBucket: "plastic-detection-598e8.appspot.com",
  messagingSenderId: "17850650140",
  appId: "1:17850650140:web:2a7e233f3eaa50fca8d9d9",
  measurementId: "G-93YTTTVMVG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);


export { app, auth, storage };
