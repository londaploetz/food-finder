import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { db } from "./firebase"
import {
    collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";

const signUp = async (email, password, displayName) => {
 

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password, 
      displayName, 
    );
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      id: user.uid,
      email: user.email,
      displayName: displayName, 
    });
    return true
  } catch (error) {
    return { error: error.message }
  }
};

export default signUp; 