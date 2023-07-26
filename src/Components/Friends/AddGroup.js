import React, { useState } from "react";
import AddFriends from "./AddFriends";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddGroup({ friendsUsernameInput, handleFriendsChange, addFriends, friends, getFriends }) {
    const [showFriends, setShowFriends] = useState(false)


    const showFriendsList = (e) => {

        if (showFriends === false) {
            setShowFriends(true)

        } else if (showFriends === true) {
            setShowFriends(false)
        }
        console.log(showFriends)
    }



    return (
        <Form >
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                    value={friendsUsernameInput}
                    name="displayName"
                    placeholder="friends displayName"
                    onChange={handleFriendsChange}
                />
            </Form.Group>

            <Button onClick={addFriends}>
                Submit
            </Button>
            <Button className="switch-btn" onClick={showFriendsList}> {showFriends === false ? "show friends" : "close"} </Button>
            {showFriends === true && friends.map((friend, i) => (
                <h1 key={i} > {friend.displayName} </h1>
            ))
            }

        </Form>
    );
}

export default AddGroup;