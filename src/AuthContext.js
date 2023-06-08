import React, { useState, useEffect, createContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
 import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from './firebase/firebase'


export const TestContext = createContext();

const TestProvider = (props) => {
    const [userDisplayName, setUserDisplayName] = useState('Anna')
    const auth = getAuth();
    
    const getUserDisplayName = async (user) => { 
         
        const q = query(collection(db, "users"), where("id", "==", user.uid));
            
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

          setUserDisplayName(doc.data().displayName)
        });
       
        // ...
    }
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
         getUserDisplayName(user); 
           
        } else {

        }
    });
    return (
        <TestContext.Provider value={userDisplayName}> 
           {props.children}
        </TestContext.Provider>
    )
}



export default TestProvider;