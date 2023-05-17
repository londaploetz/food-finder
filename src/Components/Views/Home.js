import React, { useState, useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { auth } from '../../firebase/firebase';
import { signUp } from "../Views/SignUp"
import { Signup } from "../Views/SignUp"
import {
    collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore"; 
import { AuthProvider } from '../../provider/AuthProvider';
import authMethods from "../../firebase/authMethods"



const Home = () => {
   
  
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/Login");
            // console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

      const [addFood, setAddFood] = useState("")


 
    // const data = {
    //     food: addFood,
    //     id: userId,
    // };

    const submit = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "foodlist"), {
            food: addFood,
            id: user.uid, 
       
          });
   
 };

 const getList = async () => {

    const docRef = doc(db, "foodlist");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
   } else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
 }
    return (
        <>
            <nav>
                <div> Welcome Home 
                    <form>
                        <input 
                        name="food" 
                        value={addFood} 
                        placeholder  = "add food" 
                        onChange={(e) => setAddFood(e.target.value)} 
                        label="name"
                        type="text"
                       />

                        <button type="submit" onClick={submit}> save food </button>
                    </form>
                    
                </div>
                <div>
                    <button onClick={getList}>
                        list
                    </button>
                    <>  </>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Home;