
import React, { useState, useEffect, useContext } from "react";
import foodPlaces from "../../Utils/restaurants.json";
import SelectPlace from "./SelectPlace"


const SortRestaurants = () => (

 <div>
        {foodPlaces.restaurants.map((place, index) => (
            <SelectPlace name={place.name} cuisineType={place.cuisineType} key={index} place={place} />
        ))}
 
</div>
        )

export default SortRestaurants;