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
import  AuthContext  from "../AuthContext.js";
import { AuthProvider } from '../provider/AuthProvider.js';
import { onAuthStateChanged } from "firebase/auth"
import "./views.css"



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

        <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>

                    <h2 className="text-white text-center text-base  tracking-tight text-gray-900">

                    </h2>
                </div>


                <form onSubmit={onSubmit} className="mt-8 space-y-6" >
                    <div className=" space-y-6 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">

                            </label>
                            <input
                                label="name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                name="displayName"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="First name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={onSubmit}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign up
                        </button>
                    </div>

                </form>


                <p className="text-sm text-white text-center">
                    Already have an account?{' '}
                    <NavLink to="/login" className="underline text-tertiary">
                        Sign in
                    </NavLink>
                </p>

            </div>
        </div>

    </div>
)
}

export default Signup