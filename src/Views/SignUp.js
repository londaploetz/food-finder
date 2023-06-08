import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import {
    collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";
import { getAuth } from 'firebase/auth';

import {AuthContext} from "../provider/AuthProvider";
import { AuthProvider } from '../provider/AuthProvider.js';
import { onAuthStateChanged } from "firebase/auth"
import "./views.css"

import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('toggle sign up'),
    );

    return (
        <button
            className='signup-lnk'
            type="button"
            style={{ color: 'red' }}
            onClick={decoratedOnClick} 
        >
            {children}
        </button>
    );
}


const Signup = () => {
      const { 
        signUp, 
        onSubmit, 
        email,
        displayName,
        password,
        setPassword,
        setEmail,
        setDisplayName,
        firstName, 
        lastName, 
        setFirstName, 
        setLastName,  
        currentUID } = useContext(AuthContext);

    const navigate = useNavigate();

    // const [displayName, setDisplayName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('');
    // const [currentUID, setCurrentUID] = useState(null);
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [userssData, setUsersData] = useState([]);
    // const [error, seterror] = useState("");




    // const createAccount = async (email, password, displayName) => {

    //     try {
    //       const userCredential = await createUserWithEmailAndPassword(
    //         auth,
    //         email,
    //         password, 
    //         displayName, 
          
    //       );
      
    //       const userProfile = userCredential.userContext;
    //       await addDoc(collection(db, "users"), {
    //         id: userProfile.uid,
    //         email: userProfile.email,
    //         displayName: displayName, 
            
    //       });
         
         
    //       return true
    //     } catch (error) {
    //       return { error: error.message }
    //     }
       
    //   };


    // const onSubmit = async (e) => {

    //     e.preventDefault()

    //     setEmail("");
    //     setPassword("");
    //     const currentUID = userContext.uid
    //     setCurrentUID(currentUID)
    //     navigate("/Home")
    //     console.log(userContext)

    //     const res = await signUp(email, password, displayName, currentUID);
    //     if (res.error) seterror(res.error)
       
    // }






    return (
        <div >

            <Accordion className='accordion' defaultActiveKey="0">
                <Card className='card'>
                    <Card.Header className='card-header'>
                        <CustomToggle className="custom-toggle" eventKey="1">Sign Up</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <form onSubmit={onSubmit} className="signup-form" >
                                <div className="card-form">
                                    <div>
                                        <label htmlFor="firstName" className="label-signup">
                                          First Name
                                        </label>
                                        <input
                                            label="first-name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            name="firstName"
                                            type="text"
                                            required
                                            className='input-signup'
                                            placeholder="First Name"
                                        />
                                        <label htmlFor="lastName" className="label-signup">
                                          Last Name
                                        </label>
                                           <input
                                            label="last-name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            name="lastName"
                                            type="text"
                                            required
                                            className='input-signup'
                                            placeholder="Last Name"
                                        />
                                        <label htmlFor="displayName" className="label-signup">
                                          display Name
                                        </label>
                                         <input
                                            label="name"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            name="displayName"
                                            type="text"
                                            required
                                            className='input-signup'
                                            placeholder="Name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email-address" className="label-signup">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            label="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className='input-signup'
                                            placeholder="Email address"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="label-signup">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            label="Create password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className='input-signup'
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        onClick={onSubmit}
                                        className='account-btn'

                                    >
                                        Create Account
                                    </button>
                                </div>

                            </form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

        </div>

    )
}

export default Signup