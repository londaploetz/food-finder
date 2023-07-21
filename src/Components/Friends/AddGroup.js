import React from "react";
import AddFriends from "./AddFriends";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddGroup({ friendsUsernameInput, handleFriendsChange, addFriends, friends, getFriends }) {


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
            <Button onClick={getFriends}>
                get friends
            </Button>
            {friends.map((friend, i) => (
                <h1 key={i} > {friend.displayName} </h1>
            ))}
            {/* <h1>{friends[0].displayName}</h1> */}
            
        </Form>
    );
}

export default AddGroup;