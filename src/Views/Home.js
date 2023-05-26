import React, { useState, useEffect, useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import { signUp } from "./Signup"
import { Signup } from "./Signup"
import {
    collection, getDocs, getDoc, query, addDoc, updateDoc, where, deleteDoc, doc, setDoc
} from "firebase/firestore";
import { AuthProvider } from '../provider/AuthProvider';
import authMethods from "../firebase/authMethods";
import FilterRestaurants from '../Components/Restaurants/FilterRestaurants';
import "./views.css"
import Header from '../RunningSections/Header';


const Home = () => {

    const [profileName, setProfileName] = useState([]);
    const usersCollectionRef = collection(db, "users");
    
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/Login");
            // console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }
    

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef, where("id", "==", `${user.uid}`));
          setProfileName(data.docs.map((doc) => ({ ...doc.data() })));
        };
    
        getUsers();
      }, []);

    return (
        <>
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
        </>
    )
}

export default Home;