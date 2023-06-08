import React, { useContext, useState, useEffect } from "react";
import "./userabout.css"
import { AuthContext } from "../../provider/AuthProvider";
import { doc, updateDoc, collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";


function UserAbout() {

    const {aboutMe, currentUID, firstName, lastName } = useContext(AuthContext);
   const [party, setParty] = useState(""); 
   const [userAboutInfo, setUserAboutInfo] = useState([]); 

    const updateAbout = async (e) => {
        e.preventDefault();
        const aboutRef = doc(db, "users", currentUID);
        console.log(currentUID)
        console.log(party)
        console.log(aboutMe)
        await updateDoc(aboutRef, {
            aboutMe: party
        })
        .then(() => {
            console.log("A New Document Field has been added to an existing document");
        })
        .catch(error => {
            console.log(error);
        });
        fetchAbout(); 
       
}



    const fetchAbout = async () => {
        const q = query(collection(db, "users"), where("id", "==", currentUID));
        const querySnapshot = await getDocs(q);
        const savedAbout = [];
        querySnapshot.forEach((doc) => {
            savedAbout.push({ ...doc.data() });
           
        });
         setUserAboutInfo(savedAbout)
    }

    useEffect(() => {
        fetchAbout(); 
    }, [userAboutInfo])

    return (
        <div className="profile">
            <form>
                <input
                    placeholder="update bio"
                    onChange={(e) => setParty(e.target.value)}
                    type="text"
                    onSubmit={updateAbout}
                    className="about-input"
                    value={party}
                   
                />
                <button type="submit" className="update-about-btn" onClick={updateAbout}> save food </button>
            </form>
            <h1 className="profileName"> {firstName} {lastName} </h1>

            {
                        userAboutInfo?.map((info, i) => (
                            <h1 key={i}
                                className="food-list">{info.aboutMe} </h1>

                        ))
                    }
        </div>
    );
}

export default UserAbout;