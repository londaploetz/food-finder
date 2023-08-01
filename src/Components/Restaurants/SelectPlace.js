import React, { useState, useEffect, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./restaurants.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import {
    collection,
    getDocs,
    query,
    where,
    setDoc,
    doc
} from "firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider";
import AddFriends from "../Friends/AddFriends";

import foodPlaces from "../../Utils/restaurants.json"
const { rando, randoSequence } = require('@nastyox/rando.js');

const SelectPlace = () => {
    const [restaurantName, setRestaurantName] = useState("start your food journey");
    const [cuisineType, setCuisineType] = useState("yumm");


    function cards() {
       const num = (foodPlaces.restaurants.length)
       
     console.log(num)
        let idYouWant = rando(foodPlaces.restaurants.length)
        let map = foodPlaces.restaurants.filter((item) => {
            let foodPlacesIndex = foodPlaces.restaurants.indexOf(item)
            return foodPlacesIndex == idYouWant
        }
        )
        setRestaurantName(map[0]["name"]);
        setCuisineType(map[0]["cuisineType"]);
    }



    return (
        <div>
            <Row xs={12} className="friends-food-flex">
                 <Col>
                <AddFriends> </AddFriends>
                </Col>
                <Col>
                    <div className="card text-center">
                        <div className="card-header">
                            <h1>{restaurantName}</h1>
                        </div>
                        <div className="card-footer text-muted">
                            <div className="card-body">
                                <h5 className="card-title">{cuisineType}</h5>
                            </div>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            <Button className="next-btn" onClick={cards}> Next </Button>
                        </div>
                    </div>
                </Col>
               
            </Row >
        </div>
    );
}



export default SelectPlace;