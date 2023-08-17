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
    const [counter, setCounter] = useState(0);
    const [yes, setYes] = useState(null); 

        //increase counter
        const increase = () => {
            const numOfRestaurants = foodPlaces.restaurants.length;
    
                setCounter(count => count + 1);
               
            if (counter === (numOfRestaurants - 1)) {
                reset()
            }
            cards()
        };

        //decrease counter
        const decrease = () => {  
        if (counter >= 1 ) {
              setCounter(count => count - 1);  
        } else 
            cards()
        };

        //reset counter 
        const reset = () => {
       setCounter(0)
            
            }
        
       function cards() { 
        const numOfRestaurants = foodPlaces.restaurants.length;
        if (counter !== numOfRestaurants) {
       
        let filterdFoodPlaces = foodPlaces.restaurants.filter((item) => {
            let foodPlacesIndex = foodPlaces.restaurants.indexOf(item)
            return foodPlacesIndex == counter
        }
        )
       
        setRestaurantName(filterdFoodPlaces[0]["name"]);
        setCuisineType(filterdFoodPlaces[0]["cuisineType"]);
    }
    }

  
function addYes() {
    setYes(true); 
}

    return (
        <div>
            <Row xs={12} className="friends-food-flex">
                <Col>
                    <AddFriends />
                </Col>
                <Col>
                    <div className="card text-center">
                        <div className="card-header"><Button className="nexr-btn" onClick={addYes}>fav </Button>
                            <h1>{restaurantName}</h1>  
                        </div>
                        <div className="card-footer text-muted">
                            <div className="card-body">
                                <h5 className="card-title">{cuisineType}</h5>
                            </div>
                            <Button className="next-btn" onClick={increase}> Next </Button>
                            <Button className="next-btn" onClick={decrease}> Back </Button>
                            <Button className="next-btn" onClick={reset}> Reset </Button>
                        </div>
                    </div>
                </Col>

            </Row >
        </div>
    );
}



export default SelectPlace;