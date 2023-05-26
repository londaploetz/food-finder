import React, { useState, useEffect } from "react";
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
                        />

                        <button type="submit" className="food-submit-btn" onClick={addFood}> save food </button>
                    </form>
                </Row>



                <Row className="food-content">
                    {
                        foodCollection?.map((food, i) => (
                            <h1 key={i}
                                className="food-list">{food.food} {food.displayName}</h1>

                        ))
                    }
                </Row>
            </Container>


        </>


    )
}
export default FilterRestaurants;