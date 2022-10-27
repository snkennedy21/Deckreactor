import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDeleteDeckMutation } from "../../store/myCardsApi";

function DeleteDeckModal(props) {
  const deckId = props.deckId;
  const [success, setSuccess] = useState(false);
  const [deleteDeck] = useDeleteDeckMutation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // const handleClose = () => {

  // }

  function handleSubmit(e) {
    e.preventDefault();
    deleteDeck({deckId});
    setSuccess(true);
  }

  return (
    <React.Fragment>
      {/* <Button variant="primary" onClick={handleShow}>
        Create Deck
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Deck</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Deck Name</Form.Label>
              <Form.Control
                onChange={nameChangeHandler}
                type="input"
                placeholder="Enter Name"
                autoFocus
                value={name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Deck Description</Form.Label>
              <Form.Control
                onChange={descriptionChangeHandler}
                as="textarea"
                rows={3}
                value={description}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={submitHandler}>
              Delete Deck
            </Button>
          </Modal.Footer>
        </Form>
      </Modal> */}
    </React.Fragment>
  )
}