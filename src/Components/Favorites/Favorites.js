import React, { useContext, useState, useEffect } from "react";
import "./userabout.css"
import { AuthContext } from "../../provider/AuthProvider";
import { doc, updateDoc, collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons'

function Favorites() {

//   const { aboutMe, currentUID, firstName, lastName, setAboutMe } = useContext(AuthContext);
//   const [favorites, setFavorites] = useState(false);
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const updateAbout = async (e) => {
//     e.preventDefault();
//     const favRef = doc(db, "users", currentUID);



//     await updateDoc(favRef, {
//       aboutMe: userAboutInfo

//     })
//       .then(() => {

//         console.log("A New Document Field has been added to an existing document");
//       })
//       .catch(error => {

//       });

//     fetchAbout();
//   }


//   const fetchAbout = async () => {

//     const q = query(collection(db, "users"), where("id", "==", currentUID));
//     const querySnapshotAbout = await getDocs(q);
//     const savedAbout = [];
//     querySnapshotAbout.forEach((doc) => {
//       savedAbout.push(doc.data().aboutMe);

//     });
//     setUserAboutInfo(...savedAbout)
//     setAboutMe(userAboutInfo)
//     console.log(userAboutInfo)
//   }

//   useEffect(() => {
//     if (currentUID) {
//       fetchAbout();
//     }

//   }, [currentUID])

  return (
    <div className="profile">
  

    </div>
  );
}

export default Favorites;