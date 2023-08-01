import React, { useState, useEffect, useContext } from "react";
import { AuthMethods } from "../../firebase/authMethods";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import uuid from 'react-uuid';
import {
    collection, getDocs, query, where, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc
} from "firebase/firestore";
import "./restaurants.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
import { AuthProvider } from '../../provider/AuthProvider';
import { AuthContext } from "../../provider/AuthProvider";
import UserAbout from "../UserAbout/UserAbout.js";
import Favorites from "../Favorites/Favorites";


function FilterRestaurants(props) {

    const [food, setFood] = useState(""); 
    const [foodCollection, setFoodCollection] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const {displayName, currentUID } = useContext(AuthContext);
    
    const [favList, setFavList] = useState([]);
    const [favorites, setFavorites] = useState(false);

   

    const handleFav = async (id) => {
        const favRef = doc(db, "foodlist", id);
        await updateDoc(favRef, {
            favorites: true
        });
        setFavorites(true); 
        fetchFavs()
    };



    const fetchFavs = async () => {
      const q = query(collection(db, "foodlist"), where("uid", "==", currentUID), where("favorites", "==", true));
      await getDocs(q)
        .then((querySnapshot) => {
          const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
          setFavList(newData);
         
        })
    }
  
  
  
    const deleteFav = async (id) => {
        const favRef = doc(db, "foodlist", id);
        await updateDoc(favRef, {
            favorites: false
        });
        setFavorites(false); 
        fetchFavs();
  
  }

    const addFood = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "foodlist"), {
            food: food,
            uid: currentUID,
            id: uuid(),
            favorites: favorites
        });
        fetchFood();
        setFood("");
    };

    const deleteFood = async (id) => {
        await deleteDoc(doc(db, "foodlist", id));
       
        fetchFood();
    }


    const fetchFood = async () => {
        const q = query(collection(db, "foodlist"), where("uid", "==", currentUID));
        await getDocs(q)
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setFoodCollection(newData);                
                // console.log(foodCollection, newData);
    
            })
    }
   

    useEffect(() => {
        if (currentUID) {
            fetchFood();
            fetchFavs(); 
        }
    }, [currentUID])



    return (
        <>

            <Container className="food-container" fluid>
                <Row className="add-food">
                    <form className="food-form">
                        <input
                            placeholder="add food"
                            onChange={(e) => setFood(e.target.value)}
                            type="text"
                            onSubmit={addFood}
                            className="food-input"
                            value={food}
                        />

                        <Button type="submit" className="food-submit-btn" onClick={addFood}> Add Restaurants </Button>
                    </form>
                </Row>

                <Row className="food-content">
                    {
                        foodCollection.length > 0 && foodCollection.map((food, i) => (
                            <h1 key={i}
                                className="food-list">{food.food} 
                                <Button className= "fav-btn" onClick={() => {handleFav(food.id)}} > Fav </Button>
                                <Button className= "fav-btn" onClick={() => {deleteFood(food.id)}} > Delete </Button>
                            </h1>

                        ))
                    }
              
                       
                </Row>
                <Row> <h1> {displayName}'s Favorites</h1>
                 <Favorites 
                        favList = {favList}
                        deleteFav = {deleteFav}
                    /> 
                    </Row>
            </Container>
        </>
    )
}
export default FilterRestaurants