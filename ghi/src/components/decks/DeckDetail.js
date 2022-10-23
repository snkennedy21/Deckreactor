import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaPlus, FaMinus } from "react-icons/fa";

function DeckDetail() {
  const [cards, setCards] = useState([]);
  const stuff = useSelector((state) => state.deck);
  let deckId = stuff.id;
  const navigate = useNavigate();

  useEffect(() => {
    async function getCardsInDeck() {
      if (deckId === "") {
        deckId = localStorage.getItem("deckId");
      } else {
        localStorage.setItem("deckId", deckId);
      }
      const deckUrl = `http://localhost:8000/decks/${deckId}`;
      const fetchConfig = {
        method: "get",
        credentials: "include",
      };
      const deckResponse = await fetch(deckUrl, fetchConfig);
      if (deckResponse.ok) {
        const deckData = await deckResponse.json();
        setCards(deckData.cards);
      }
    }
    getCardsInDeck();
  }, []);

  function execute() {
    navigate("/decks");
  }

  async function increaseCardInDeck(e) {
    const multiverseId = e.currentTarget.value;
    const newCards = cards.map((card) => {
      if (card.multiverse_id == multiverseId) {
        card.quantity++;
      }
      return card;
    });
    setCards(newCards);
    const addCardUrl = `http://localhost:8000/decks/${deckId}/add/${multiverseId}`;
    const fetchConfig = {
      method: "PUT",
      credentials: "include",
    };
    const response = await fetch(addCardUrl, fetchConfig);
    console.log(response);
  }

  async function decreaseCardInDeck(e) {
    const multiverseId = e.currentTarget.value;
    const newCards = cards
      .map((card) => {
        if (card.multiverse_id == multiverseId) {
          card.quantity--;
        }
        return card;
      })
      .filter((card) => card.quantity > 0);
    setCards(newCards);
    const addCardUrl = `http://localhost:8000/decks/${deckId}/remove_one/${multiverseId}`;
    const fetchConfig = {
      method: "PUT",
      credentials: "include",
    };
    const response = await fetch(addCardUrl, fetchConfig);
    console.log(response);
  }

  return (
    <React.Fragment>
      <Button onClick={execute}>Back To Decks</Button>
      <Container>
        <Row>
          {cards.map((card) => {
            return (
              <Col
                key={card.multiverse_id}
                xxl="2"
                xl="3"
                l="3"
                md="4"
                sm="6"
                xs="12"
              >
                <Image src={card.picture_url} style={{ width: "100%" }} />
                <Button value={card.multiverse_id} onClick={increaseCardInDeck}>
                  <FaPlus></FaPlus>
                </Button>
                <Button value={card.multiverse_id} onClick={decreaseCardInDeck}>
                  <FaMinus></FaMinus>
                </Button>
                <div>{card.name}</div>
                <div>Quantity in Deck: {card.quantity}</div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default DeckDetail;
