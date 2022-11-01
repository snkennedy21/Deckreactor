import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useCreateDeckMutation } from "../../store/RTK_Query/myCardsApi";

function CreateDeckModal(props) {
  const [name, setName] = useState("");
  const [description, setDescriptioon] = useState("");
  const [createDeck] = useCreateDeckMutation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function submitHandler(e) {
    e.preventDefault();

    const body = {
      name: name,
      description: description,
    };

    createDeck(body);

    setShow(false);
  }

  function nameChangeHandler(e) {
    setName(e.target.value);
  }

  function descriptionChangeHandler(e) {
    setDescriptioon(e.target.value);
  }

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow}>
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
            <Button variant="primary" onClick={submitHandler}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default CreateDeckModal;
