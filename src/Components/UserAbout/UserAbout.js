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

  const { aboutMe, currentUID, firstName, lastName, setAboutMe } = useContext(AuthContext);
  const [userAboutInfo, setUserAboutInfo] = useState("");
  const [userPic, setUserPic] = useState("pic1")
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

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
    setAboutMe(userAboutInfo)

  }

  useEffect(() => {
    if (currentUID) {
      fetchAbout();
      console.log()
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
                <img
                  className="pics-profile-sm"
                  src={pic1}
                />
                <img
                  className="pics-profile-sm"
                  src={pic2}
                />
                <img
                  className="pics-profile-sm"
                  src={pic3}
                />
                <img
                  className="pics-profile-sm"
                  src={pic4}
                />
                <img
                  className="pics-profile-sm"
                  src={pic5}
                />
                <img
                  className="pics-profile-sm"
                  src={pic6}
                />
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
        <Button variant="secondary" onClick={handleClose}>
          Save
        </Button>

        <Button className="logout-btn" onClick={handleLogout} type="submit">
          Logout
        </Button>




      </Modal>
      <div className="user-flex">

        <img src={pic1}
          className="pic1"
          alt={"profile pic donut"}
        />
        <h1 className="profileName"> {firstName} {lastName}
          <p className="userabout-txt"> {userAboutInfo}</p>
        </h1>
      </div>
    </div>
  );
}

export default UserAbout;