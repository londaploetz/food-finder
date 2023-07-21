import React, { useState, useEffect } from "react";
import AddGroup from "./AddGroup";
import AddFriends from "./AddFriends";


function FriendsList({ handleFriendsChange, friendsUsernameInput, friends, addFriends }) {

    return (
        <div>
            <AddGroup
                friendsUsernameInput={friendsUsernameInput}
                handleFriendsChange={handleFriendsChange}
                addFriends={addFriends}
                friends={friends}
            />
        </div>
    );
}

export default FriendsList;