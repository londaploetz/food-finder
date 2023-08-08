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


 

    // var getRand = (function() {
    //     let nums = []
    //     let n = foodPlaces.restaurants.length
    //     for (let i = 0; i <= foodPlaces.restaurants.length ; i++) {
    //         nums.push(i++) 

    //     } 

    //     var current = [];
    //     function rand(n) {
    //         return (Math.random() *n)|0;
    //     }
    //     return function() {
    //       if (!current.length) current = nums.slice();
    //       return current.splice(rand(current.length), 1);
    //     }
    // }());



    function shuffle(array) {
        var i = array.length
        var j = 0
        var temp;
        while (i--) {
            j = Math.floor(Math.random() * (i));
            // swap randomly chosen element with current element
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;

        }
        return array;
    }

        //increase counter
        const increase = () => {
            const numOfRestaurants = foodPlaces.restaurants.length;
    
                setCounter(count => count + 1);
                console.log(counter)
            
            if (counter === (numOfRestaurants - 1)) {
                reset()
            }
        };

        //decrease counter
        const decrease = () => {
            setCounter(count => count - 1);
        };

        //reset counter 
        const reset = () => {
       setCounter(0)
                console.log("hello")
                console.log(counter)
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
        increase()
    }
    }

    return (
        <div>
            <Row xs={12} className="friends-food-flex">
                <Col>
                    <AddFriends />
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
                            <Button className="next-btn" onClick={increase}> I </Button>
                            <Button className="next-btn" onClick={reset}> R </Button>
                        </div>
                    </div>
                </Col>

            </Row >
        </div>
    );
}



export default SelectPlace;