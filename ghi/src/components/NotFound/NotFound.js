import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { useState } from 'react';



function NotFoundPage() {



  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

         
        
        return (                  
                <div style={{
                        backgroundImage: 
                        `url(https://media.magic.wizards.com/images/wallpaper/where_fbithp_2560x1600.jpg)`,
                        backgroundPositionY: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        height: "100vh",
                        opacity: 2,
                        }}>

                <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                                <h1 className="text-xs-center">Page not found</h1>
                        </Modal.Header>
                          <Modal.Body>
                                <Card>
                                <img  src="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=553908&type=card" alt="unauthorized" />
                                </Card>
                          </Modal.Body>
                        <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Link to="/home"><Button variant="success">Take me home</Button></Link>
                        </Modal.Footer>
                </Modal>  
                </div>
        );
    }
export default NotFoundPage;






