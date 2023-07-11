import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../provider/AuthProvider";
import { doc, updateDoc, collection, where, query, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import FilterRestaurants from "../Restaurants/FilterRestaurants";

function Favorites({favList, deleteFav}) {

  // const { aboutMe, currentUID } = useContext(AuthContext);


//   const [favList, setFavList] = useState([]);


//   const fetchFavs = async (props) => {
//     const q = query(collection(db, "foodlist"), where("uid", "==", currentUID), where("favorites", "==", true));
//     await getDocs(q)
//       .then((querySnapshot) => {
//         const newData = querySnapshot.docs
//           .map((doc) => ({ ...doc.data(), id: doc.id }));
//         setFavList(newData);
//         console.log(favList);
//       })
//   }



//   const deleteFav = async (id) => {
//     await deleteDoc(doc(db, "foodlist", id));
//     console.log(id)
//     fetchFavs();

// }


//   // const getFavs = async () => {
//   //   const q = query(collection(db, "foodlist"), where("favorites", "==", true));
//   //   const querySnapshot = await getDocs(q);
//   //   querySnapshot.forEach((doc) => {
//   //    setFavList(doc.data())
//   // })
//   //   }

  // useEffect(() => {
  //   if (currentUID) {
  //     fetchFavs();
  //   }
  // }, [currentUID])


  return (
    <div className="profile">

      {
        favList.length > 0 && favList.map((fav, i) => (
          <h1 key={i}
            className="food-list">{fav.food} {fav.uid}  
             <button onClick={() => {deleteFav(fav.id)}} > </button>
          </h1>
        

        ))
      }
    </div>
  );
}

export default Favorites;