import React, { useState, useEffect, useContext } from "react";
import { AuthMethods } from "../../firebase/authMethods";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import uuid from 'react-uuid';
import {
    collection, getDocs, query, where, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";
import "./restaurants.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthProvider } from '../../provider/AuthProvider';
import { AuthContext } from "../../provider/AuthProvider";
import UserAbout from "../UserAbout/UserAbout.js";

function FilterRestaurants() {

    const [food, setFood] = useState("")
    const [foodCollection, setFoodCollection] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const { displayName, currentUID } = useContext(AuthContext);

    const [favorites, setFavorites] = useState(false);

    const handleFav = async (id) => {

        const favRef = doc(db, "foodlist", id);
        await updateDoc(favRef, {
            favorites: true
        });
        setFavorites(true)
    };



    const addFood = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "foodlist"), {
            food: food,
            uid: currentUID,
            id: uuid(),
            favorites: favorites
        });
        fetchFood();
        setFood("");
    };

    const deleteFood = async (id) => {
        await deleteDoc(doc(db, "foodlist", id));
        console.log(id)
        fetchFood();
    }


    const fetchFood = async () => {
        const q = query(collection(db, "foodlist"), where("uid", "==", currentUID));
        await getDocs(q)
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setFoodCollection(newData);                
                console.log(foodCollection, newData);
    
            })
       
    }
   

    // const fetchFood = async () => {
    //     const savedFood = [];
    //     console.log(currentUID)
    //     const q = query(collection(db, "foodlist"), where("uid", "==", currentUID));
    //     const querySnapshot = await getDocs(q);

    //     querySnapshot.forEach((doc) => {
    //         savedFood.push({ ...doc.data(), id:doc.id});

    //       setFoodCollection(savedFood); 
    //     });
        
    //     console.log(foodCollection)
    // }

    useEffect(() => {
        if (currentUID) {
            fetchFood();
        }
    }, [currentUID])



    return (
        <>

            <Container className="food-container" fluid>
                <Row className="add-food">
                    <form className="food-form">
                        <input
                            placeholder="add food"
                            onChange={(e) => setFood(e.target.value)}
                            type="text"
                            onSubmit={addFood}
                            className="food-input"
                            value={food}
                        />

                        <button type="submit" className="food-submit-btn" onClick={addFood}> save food </button>
                    </form>
                </Row>

                <Row className="food-content">
                    {
                        foodCollection.length > 0 && foodCollection?.map((food, i) => (
                            <h1 key={i}
                                className="food-list">{food.food} {food.uid}
                                <button onClick={() => {handleFav(food.id)}} > </button>
                                <button onClick={() => {deleteFood(food.id)}} > </button>
                            </h1>

                        ))
                    }
                </Row>
            </Container>
        </>
    )
}
export default FilterRestaurants