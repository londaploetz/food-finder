import React, { useState, useEffect, useContext } from "react";
import { AuthMethods } from "../../firebase/authMethods";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import { auth } from '../../firebase/firebase';
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
    const [foodCollection, setFoodCollection] = useState([])

    const { displayName, currentUID } = useContext(AuthContext);
  


    const addFood = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "foodlist"), {
            food: food,
            id: currentUID,
        });
        fetchFood();
        setFood("");
    };


    const fetchFood = async () => {

        const q = query(collection(db, "foodlist"), where("id", "==", currentUID));
        const querySnapshot = await getDocs(q);
        const savedFood = [];
        querySnapshot.forEach((doc) => {
            savedFood.push({ ...doc.data() });
            
        });
     
       setFoodCollection(savedFood);

    }

    useEffect(() => {
        fetchFood();
    }, [foodCollection])



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
                        foodCollection?.map((food, i) => (
                            <h1 key={i}
                                className="food-list">{food.food} </h1>

                        ))
                    }
                </Row>
            </Container>
        </>
    )
}
export default FilterRestaurants;