import React, { useState, useEffect, useContext } from "react";

import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc
} from "firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider";
import FriendsList from "./FriendsList";

function AddFriends() {

  const { currentUID } = useContext(AuthContext);
  const [friendsUsernameInput, setFriendsUsernameInput] = useState('')
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState(currentUID);


  const handleFriendsChange = (event) => {
    const { name, value } = event.target;
    setFriendsUsernameInput(value);
  };



  const getFriends = async () => {
    const q = query(collection(db, "users"), where("id", "==", currentUID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     
      console.log("group", doc.id, " => ", doc.data().group)
      setUser(doc.data())

      setFriends(doc.data().group)
    });
  }


  const addFriends = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", friendsUsernameInput));
    console.log("friendsusernameinput", friendsUsernameInput)
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docsnapshot) => {
      const newFriendProfile = friends;
      newFriendProfile.push(docsnapshot.data());
      console.log("docsnapshot.data()", docsnapshot.data())
      console.log("newFriendProfile", newFriendProfile)
      const userAddedNewFriend = {
        group: newFriendProfile,
        id: user.id,
        displayName: user.displayName
      }
      
      setFriends(newFriendProfile)
      console.log(newFriendProfile)
      setUser(userAddedNewFriend);
      const newFriends = doc(db, "users", currentUID)
      setDoc(newFriends, userAddedNewFriend)
      // console.log(currentUID)
      // // console.log(uid)
      // console.log(friendsUsernameInput)
      setFriendsUsernameInput('');
    });
  }


  useEffect(() => {
    if (currentUID !== null) {
      setUserId(currentUID)
      console.log(user)
      console.log(friends)
    getFriends()
    }
  }, [currentUID, userId]);

  return (
    <FriendsList
      friendsUsernameInput={friendsUsernameInput}
      handleFriendsChange={handleFriendsChange}
      addFriends={addFriends}
      friends={friends}
    />
  );
}

export default AddFriends;