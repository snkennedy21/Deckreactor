import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDeleteDeckMutation } from "../../store/RTK_Query/myCardsApi";
import ParseSymbolsAndLineBreaks from "../card-details/ParseSymbolsAndLineBreaks";

function DeleteDeckModal(props) {
  const deckId = props.deckId;
  const deckName = props.deckName;
  const [deleteDeck] = useDeleteDeckMutation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function handleSubmit(e) {
    e.preventDefault();
    deleteDeck({ deckId });
    navigate("/decks");
  }

  return (
    <React.Fragment>
      <Button variant="outline-danger" onClick={handleShow}>
        Delete Deck
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
          >
            Are you sure you want to delete deck "
            <ParseSymbolsAndLineBreaks string={deckName} />
            "?
            <br />
            <br />
            This action cannot be undone.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteDeckModal;
