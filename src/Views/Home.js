import React, { useState, useEffect, useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import UserAbout from '../Components/UserAbout/UserAbout';

import {
    collection, getDocs, getDoc, query, addDoc, updateDoc, where, deleteDoc, doc, setDoc
} from "firebase/firestore";
import { AuthProvider } from '../provider/AuthProvider';
import authMethods from "../firebase/authMethods";
import FilterRestaurants from '../Components/Restaurants/FilterRestaurants';
import "./views.css"
import Header from '../RunningSections/Header';
import { AuthContext } from "../provider/AuthProvider";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FriendsList from '../Components/Friends/FriendsList';
import AddFriends from '../Components/Friends/AddFriends';

const Home = () => {
    const { displayName } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          navigate("/Login");
          // console.log("Signed out successfully")
        }).catch((error) => {
          // An error happened.
        });
      }
    


    return (
        <div className="home-bgr">
            <Header>
            </Header>
            <Container className='home-food-user'>
                <Row>
                    <Col sm={4}>
                        <UserAbout>
                        </UserAbout>
                    </Col>
                    <Col sm={8}>
                        <div className="food-content">
                        </div>
                        <FilterRestaurants />
                    </Col>
                </Row>
            </Container>
            <AddFriends> </AddFriends>
         
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Home;