import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.js';
import { NavLink, useNavigate } from 'react-router-dom'
import { db } from '../firebase/firebase.js';
import {AuthContext} from "../provider/AuthProvider.js";
import { AuthProvider } from '../provider/AuthProvider.js';
import "./views.css"; 
import Signup from "./Signup.js"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'




const Login = () => {
    const { email,
        displayName,
        password,
        setPassword,
        setEmail,
        setDisplayName, 
        onSubmit, 
        onLogin } = useContext(AuthContext);
 
   


    // const onLogin = (e) => {
    //     e.preventDefault();
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in
    //             setUserContext = userCredential.user;
    //             navigate("/home")
    //             console.log(userContext);
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorCode, errorMessage)
    //         });

    // }


    return (
        <>
            <main>
                <section>
                    <div className='login-container'>
                        <h1> Feeling Hungry? </h1>
                        <form className='user-login-form'>
                            <div className='login-email'>
                                <label htmlFor="email-address"
                                    className="label-form">
                                    Email address
                                </label>
                                <input
                                    className='password-input'
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                                <FontAwesomeIcon className='user-icon' icon={faUser} />
                            </div>

                            <div className='login-password'>
                                <label htmlFor="password"
                                    className='label-form'

                                >
                                    Password
                                </label>
                                <input
                                    className='password-input'
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FontAwesomeIcon className='lock-icon' icon={faLock} />
                            </div>
                        </form>
                        <div className='login-btn-ctr'>
                            <button
                                onClick={onLogin}
                                className='login-btn'
                            >
                                Login
                            </button>
                        </div>

                        <Signup> 
                        </Signup>


                    </div>
                </section>
            </main>

        </>
    )
}

export default Login