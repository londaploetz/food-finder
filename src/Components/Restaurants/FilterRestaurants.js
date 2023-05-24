import React, { useState, useEffect } from "react";
import {AuthMethods} from "../../firebase/authMethods"; 
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import {
    collection, getDocs, query, where, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";


function FilterRestaurants() {
  
    const user = auth.currentUser;
    if (user !== null) {
    }

    const [food, setFood] = useState("")
    const [foodCollection, setFoodCollection] = useState([])



    const addFood = async (e) => {
        e.preventDefault();
        
        await addDoc(collection(db, "foodlist"), {
            food: food,
            id: user.uid, 
     
            
        });
        fetchFood();
   
    };
 
  

    const fetchFood = async () => {
      
        const q = query(collection(db, "foodlist"), where("id", "==", `${user.uid}`));

        const querySnapshot = await getDocs(q);
        const savedFood = [];
        querySnapshot.forEach((doc) => {
            savedFood.push({...doc.data()});
       
        });
        setFoodCollection(savedFood); 
        
    }

    useEffect(() => {
        fetchFood();
    }, [foodCollection])



    return (
        <>

            <div>
                <form>
                    <input

                        placeholder="add food"
                        onChange={(e) => setFood(e.target.value)}
                        type="text"
                        onSubmit={addFood} 
                    />

                    <button type="submit" onClick={addFood}> save food </button>
                </form>

            </div>
            <div>

                <div className="food-content">
                    {
                        foodCollection?.map((food, i) => (
                            <h2 key={i}>
                                {food.food} {food.id} {food.displayName}
                            </h2>
                        ))
                    }
                </div>

            </div>

        </>


    )
}
export default FilterRestaurants;