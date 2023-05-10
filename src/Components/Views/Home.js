import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase/firebase"

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }



    const [food, setFood] = useState("input Food")

    return (
        <>
            <nav>
                <p> Welcome Home {auth.user}
                    <form onSubmit={e => {
                        e.preventDefault();
                        const foodRef = db.reft("food").push; 
                        // await db.ref('userFood/${uid}/${foodRef.key}').set
                    }}>
                        <input name="food" value={food} onChange={(e) => setFood(e.target.value)} />

                        <button type="submit" > save food </button>
                    </form>
                </p>

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Home;