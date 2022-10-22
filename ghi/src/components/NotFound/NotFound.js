import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { useState } from 'react';



function NotFoundPage() {



  const [show, setShow] = useState(true);
  const [found, setFound] = useState()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const image = {"fblthp" : "https://cards.scryfall.io/large/front/5/2/52558748-6893-4c72-a9e2-e87d31796b59.jpg?1559959349",
                "access" : "https://cards.scryfall.io/normal/front/0/9/09aa7744-680f-4c2a-8fa0-9cb0c176ae8f.jpg?1562814444"}

  const message = {"found_him": "You found Fblthp", 
                  "modal":"Page not found"}

  window.addEventListener("click", function(e) {
        // console.log(`x:${e.x} | y:${e.y} `)
        if((e.x > 300 && e.x < 475 && e.y > 220 && e.y < 405)
          || (e.x > 900 && e.x < 1100 && e.y > 330 && e.y < 475)){
        setFound(true)
        setShow(true)
        }
        })
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
                        { found === true ?
                        <Modal.Header closeButton>
                                <h1 className="text-xs-center">{message["found_him"]}</h1>
                        </Modal.Header>:
                        <Modal.Header closeButton>
                                <h1 className="text-xs-center">{message["modal"]}</h1>
                        </Modal.Header>}
                          <Modal.Body>
                                { found === true ?
                                <Card>
                                <img  src={image["fblthp"]}
                                 alt="found"/>
                                </Card> :
                                <Card>
                                <img  src={image["access"]}
                                 alt="unauthorized"/>
                                </Card>
                                }               
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






