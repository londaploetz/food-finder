import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from "../firebase/firebase";
import {
  collection, getDocs, query, where, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";
import { NavLink, useNavigate } from 'react-router-dom'


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [displayName, setDisplayName] = useState('party')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [currentUID, setCurrentUID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, seterror] = useState("");
  const [userContext, setUserContext] = useState(null);
  const navigate = useNavigate();


  const getDisplayName = async (user) => { 
         
    const q = query(collection(db, "users"), where("id", "==", user.uid));
        
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      setDisplayName(doc.data().displayName)
    });
   
    // ...
}

onAuthStateChanged(auth, (user) => {
    if (user) {
     getDisplayName(user); 
     const uid = user.uid;
     setCurrentUID(uid); 
    } else {

    }
});
//  onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       setCurrentUID(uid)
//     } else {
//       // User is signed out
//       // ...
//     }
//   });

  const signUp = async (email, password) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

 
      const userProfile = userCredential.user;
      await addDoc(collection(db, "users"), {
        id: userProfile.uid,
        email: userProfile.email,
        displayName: displayName,

      });
      // console.log(userProfile.email)
      return true
    } catch (error) {
      return { error: error.message }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    // setEmail("");
    // setPassword("");
    // setDisplayName("")
    navigate("/Home")
    const res = await signUp(email, password);
    if (res.error) seterror(res.error)
  }

  // const onLogin = async (email, password) => {
  //   try {
  //     const auth = getAuth();
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;
  //     return true
  //   } catch (error) {
  //     return {error: error.message}
  //   }
  // };

  async function onLogin(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/home");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/Login");
      // console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <AuthContext.Provider value={{
      userContext,
      setUserContext,
      email,
      displayName,
      password,
      setPassword,
      setEmail,
      setDisplayName,
      onSubmit,
      onLogin,
      signUp,
      handleLogout,
      currentUID,



    }}>{children}</AuthContext.Provider>
  );
};