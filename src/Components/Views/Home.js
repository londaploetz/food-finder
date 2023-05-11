import React, { useState } from 'react';
import { signOut } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import { signUp } from "../Views/SignUp"
import {
    collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc,
} from "firebase/firestore"

const Home = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }



    const [addFood, setAddFood] = useState("")
    const [userId, setUserId] = useState("")

    // const Push = () => {
    //     db.ref("foodlist").set({
    //       food : food
    //     }).catch(alert);
    //   }
    // const handleSubmit = async (e) => {
    //     e.prevent.default(); 
    //     setFood("")
    // }

    // const newFood = {
    //       food : food, 

    // }
    // console.log(newFood)


    // console.log(firstName)

    // const foodRef = collection(db, "foodlist");   
    //      console.log(foodRef); 

    //         const addFood = (newFood) => {
    //             return addDoc (foodRef, newFood)
    //         }

    // updateFood = (id, updatedFood) => {
    //     const foodDoc = doc(db, "food", id); 
    //     return updateDoc(foodDoc, updatedFood)
    // }
    // const foodRef =  db.collection("foodlist").setData(food)

    // console.log(foodRef); 

    //    const addFood = (newFood) => {
    //        return addDoc (foodRef, newFood)
    //    }

    const submit = (e) => {
        e.preventDefault();
        db.collection("foodlist").add({
            food: addFood,
            id: userId,
        });
        console.log(db.collection("foodlist"))
        setAddFood("");
        setUserId("");
    };


    return (
        <>
            <nav>
                <p> Welcome Home { }
                    <form>
                        <input name="food" value={food} onChange={(e) => setAddFood(e.target.value)} />

                        <button type="submit" onClick={submit}> save food </button>
                    </form>
                </p>
                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Home;