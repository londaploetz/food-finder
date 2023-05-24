import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { db } from "./firebase"
import {
    collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";

const signUp = async (email, password, displayName, currentUID) => {
 
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password, 
      displayName, 
      currentUID
    );

    const userProfile = userCredential.user;
    await addDoc(collection(db, "users"), {
      id: userProfile.uid,
      email: userProfile.email,
      displayName: displayName, 
      currentUID: userProfile.uid
    });
  
    return true
  } catch (error) {
    return { error: error.message }
  }
};

export default signUp; 