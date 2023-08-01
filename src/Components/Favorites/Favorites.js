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
import UserAbout from "../UserAbout/UserAbout";
import "./favorites.css"

function Favorites({ favList, deleteFav }) {




  return (
    <div className="profile">

      {
        favList.length > 0 && favList.map((fav, i) => (
          <h1 key={i}
            className="food-list">{fav.food}
            <Button className="remove-fav-btn" onClick={() => { deleteFav(fav.id) }} > Remove </Button>
          </h1>


        ))
      }

    </div>
  );
}

export default Favorites;