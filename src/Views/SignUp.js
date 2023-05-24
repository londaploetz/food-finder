import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import {
    collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import signUp from "../firebase/authMethods"
import AuthContext from "../AuthContext.js";
import { AuthProvider } from '../provider/AuthProvider.js';
import { onAuthStateChanged } from "firebase/auth"
import "./views.css"

import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
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
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [currentUID, setCurrentUID] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userssData, setUsersData] = useState([]);
    const [error, seterror] = useState("");




    const onSubmit = async (e) => {

        e.preventDefault()

        setEmail("");
        setPassword("");
        const currentUID = user.uid
        setCurrentUID(currentUID)
        navigate("/Home")
        console.log(currentUID)

        const res = await signUp(email, password, displayName);
        if (res.error) seterror(res.error)
    }






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
                                        <label htmlFor="email-address" className="label-signup">
                                          Name
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