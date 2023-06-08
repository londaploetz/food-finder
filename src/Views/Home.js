import React, { useState, useEffect, useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';


import {
    collection, getDocs, getDoc, query, addDoc, updateDoc, where, deleteDoc, doc, setDoc
} from "firebase/firestore";
import { AuthProvider } from '../provider/AuthProvider';
import authMethods from "../firebase/authMethods";
import FilterRestaurants from '../Components/Restaurants/FilterRestaurants';
import "./views.css"
import Header from '../RunningSections/Header';
import {AuthContext} from "../provider/AuthProvider";

const Home = () => {
    const { userContext, handleLogout, displayName } = useContext(AuthContext);
   


    return (
        < div className="home-bgr">
            <nav>

                <div> <Header> </Header>
                    <div className="food-content">
                    {/* {
                        profileName.map((user, i) => (
                            <p key={i}>
                                Welcome Home
                                <br/>
                                {user.displayName} 
                             
                                
                            </p>
                        ))
                    } */}
                </div>
                    <FilterRestaurants />

                    <button  className= "logout-btn"onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Home;