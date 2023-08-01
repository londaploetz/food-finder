import React, { useState } from "react";
import AddFriends from "./AddFriends";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import {Row} from "react-bootstrap"; 
import "./friends.css"

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
        <Row xs={4}>
        <Form className="find-friends-form">
            <Form.Group className="find-friends-group" controlId="formdisplayName">
                <Form.Label></Form.Label>
                <Form.Control
                    value={friendsUsernameInput}
                    name="displayName"
                    className="form-control"
                    placeholder="Friends Displayname"
                    onChange={handleFriendsChange}
                />
                <Button className="addfriends-btn" onClick={addFriends}>
                Add Friend
            </Button>
            </Form.Group>

            
            <Button className="switch-btn" onClick={showFriendsList}> {showFriends === false ? "Show Friends" : "Close Friends"} </Button>
            {showFriends === true && friends.map((friend, i) => (
                <h1 key={i} > {friend.displayName} </h1>
            ))
            }

        </Form>
        </Row>
    );
}

export default AddGroup;