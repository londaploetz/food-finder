import React, { useContext, useState, useEffect } from "react";
import "./userabout.css"; 
import { AuthContext } from "../../provider/AuthProvider";
import { doc, updateDoc, collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Button from 'react-bootstrap/Button';
import Favorites from "../Favorites/Favorites.js";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons'; 


function UserAbout() {

  const { aboutMe, currentUID, firstName, lastName, setAboutMe } = useContext(AuthContext);
  const [userAboutInfo, setUserAboutInfo] = useState("");
  const [show, setShow] = useState(false);

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
    }
  }, [currentUID])

  return (
    <div className="profile">
      <>
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon className='cogs-icon' icon={faCogs} />
          Edit Profile
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Edit</Form.Label>
                <Form.Control as="textarea" rows={3}
                  placeholder="update bio"
                  onChange={(e) => setUserAboutInfo(e.target.value)}
                  type="text"
                  onSubmit={updateAbout}
                  className="about-input"
                  value={userAboutInfo} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" className="update-about-btn" onClick={updateAbout}> save Changes </Button>
          </Modal.Footer>
        </Modal>
      </>
      <h1 className="profileName"> {firstName} {lastName} </h1>

      {userAboutInfo}
   
    </div>
  );
}

export default UserAbout;