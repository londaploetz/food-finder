import React, { useState, useEffect, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./restaurants.css"


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

import foodPlaces from "../../Utils/restaurants.json"


const SelectPlace = ({ name, cuisineType }) => {


    return (
        <div>
            <div className="card text-center">
                <div className="card-header">
                    <h1>{name}</h1>
                </div>
                <div className="card-footer text-muted">
                    <div className="card-body">
                        <h5 className="card-title">{cuisineType}</h5>
                    </div>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    );
}



export default SelectPlace;