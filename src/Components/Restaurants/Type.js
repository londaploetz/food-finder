import React, { useState, useEffect, useContext } from "react";
import "./restaurants.css"

import { Checkbox } from "./Checkbox";


function Types() {



    const cuisineNames = [
        {
            id: 0,
            name: "American",
            checked: false
        },
        {
            id: 1,
            name: "Mexican",
            checked: false
        },
        {
            id: 2,
            name: "Italian",
            checked: false
        },
        {
            id: 3,
            name: "Chinese",
            checked: false
        },
        {
            id: 4,
            name: "BBQ",
            checked: false
        },
        {
            id: 5,
            name: "Steakhouse",
            checked: false
        },
        {
            id: 6,
            name: "Cafe",
            checked: false
        },
        {
            id: 7,
            name: "Fast Food",
            checked: false
        },
        {
            id: 8,
            name: "Bar",
            checked: false
        }
    ];

    const [cuisineState, setCuisineState] = useState(cuisineNames);


    const updateCheckStatus = (index) => {
        setCuisineState(
            cuisineState.map((cuisine, currentIndex) =>
                currentIndex === index
                    ? { ...cuisine, checked: !cuisine.checked }
                    : cuisine
            )
        )
    }

    return (
        <div>
            {cuisineState.map((cuisine, index) => (
                <Checkbox
                    key={cuisine.name}
                    isChecked={cuisine.checked}
                    checkHandler={() => updateCheckStatus(index)}
                    label={cuisine.name}
                    index={index}
                />
            ))}
        </div>
    )
}

export default Types; 