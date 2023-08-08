import React, { useContext, useState, useEffect } from "react";
import "./userabout.css";
import { AuthContext } from "../../provider/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link, navigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { doc, updateDoc, collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Button from 'react-bootstrap/Button';
import Favorites from "../Favorites/Favorites.js";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faDisplay } from '@fortawesome/free-solid-svg-icons';
import { pic1, pic2, pic3, pic4, pic5, pic6 } from './imports.js';

function UserAbout() {

  const { aboutMe, currentUID, firstName, lastName, setAboutMe, profilePic, setProfilePic } = useContext(AuthContext);
  const [userAboutInfo, setUserAboutInfo] = useState("");
  const [userPic, setUserPic] = useState("")
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const profilePics = [{id: 1, type: pic1}, {id: 2, type: pic2}, {id: 3, type: pic3},{ id: 3, type: pic4}, {id: 5, type:pic5}, {id: 6, type: pic6}];

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/Login");
      // console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateAbout = async (e) => {
    e.preventDefault();
    const aboutRef = doc(db, "users", currentUID);
    await updateDoc(aboutRef, {
      aboutMe: userAboutInfo
    })
      .then(() => {
        console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
      });
    fetchAbout();
  }


  const fetchAbout = async () => {

    const q = query(collection(db, "users"), where("id", "==", currentUID));
    const querySnapshotAbout = await getDocs(q);
    const savedAbout = [];
    querySnapshotAbout.forEach((doc) => {
      savedAbout.push(doc.data().aboutMe);
      
    });
    setUserAboutInfo(...savedAbout)
    console.log(userAboutInfo)
    setAboutMe(userAboutInfo)

  }
  const fetchPic = async () => {

    const q = query(collection(db, "users"), where("id", "==", currentUID));
    const querySnapshotAbout = await getDocs(q);
    const savedPic = [];
    querySnapshotAbout.forEach((doc) => {
     setProfilePic(doc.data().profilePic)
    });
  }

  const updatePic = async (type) => {
    const userRef = doc(db, "users", currentUID);
    await updateDoc(userRef, {
      profilePic: userPic
    }) 
     console.log(userPic, "userPic")
     console.log(profilePic, "profilepic")
     setProfilePic(userPic)
     fetchPic()
  }


  useEffect(() => {
    if (currentUID) {
      fetchAbout();
      console.log()
      fetchPic()
    }
  }, [currentUID])

  return (
    <div className="profile">

      <Button className="edit-btn" variant="primary" onClick={handleShow}>
        <FontAwesomeIcon className='cogs-icon' icon={faCogs} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          </Form>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Change Profile Pic</Accordion.Header>
              <Accordion.Body className="pics-choice-sm">
                {profilePics.map((pic) => (
                 
                    <img src={pic.type} alt="my image" key={pic.id} onClick={() => { updatePic(pic.type); setUserPic(pic.type)}} key={Math.random()} />
                 
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Update Bio</Accordion.Header>
              <Accordion.Body>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >

                  <Form.Control as="textarea" rows={3}
                    placeholder="update bio"
                    onChange={(e) => setUserAboutInfo(e.target.value)}
                    type="text"
                    onSubmit={updateAbout}
                    className="about-input"
                    value={userAboutInfo} />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Button variant="secondary" onClick={updateAbout}>
          Save
        </Button>

        <Button className="logout-btn" onClick={handleLogout} type="submit">
          Logout
        </Button>




      </Modal>
      <div className="user-flex">

        <img src={profilePic}
          className="pic1"
         
        />
        <h1 className="profileName"> {firstName} {lastName}
          <p className="userabout-txt"> {userAboutInfo}</p>
        </h1>
      </div>
    </div>
  );
}

export default UserAbout;