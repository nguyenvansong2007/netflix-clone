import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import  { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAUPV3P15jcwm8hszL8x6NIogX4TrUbmpI",
  authDomain: "netflix-clone-97185.firebaseapp.com",
  projectId: "netflix-clone-97185",
  storageBucket: "netflix-clone-97185.appspot.com",
  messagingSenderId: "744640753148",
  appId: "1:744640753148:web:de0fee682aa517907b9679",
  measurementId: "G-GSYBT40YLK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }

}

const logout = () => {
    signOut(auth)
}

export {auth,db, login, signup, logout}