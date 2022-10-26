import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  useGetMyDecksQuery,
  useAddCardToDeckMutation,
  useRemoveOneCardFromDeckMutation,
} from "../../store/myCardsApi";
import { useGetTokenQuery } from "../../store/accountApi";

function DeckDetail() {
  const [cards, setCards] = useState([]);
  const { deck_id } = useParams();
  const {
    data: decksData,
    error: decksError,
    isLoading: decksIsLoading,
  } = useGetMyDecksQuery();
  const [addCardToDeck, { addError, isLoading: addCardLoading }] =
    useAddCardToDeckMutation();
  const [removeCardFromDeck, { removeError, isLoading: removeCardLoading }] =
    useRemoveOneCardFromDeckMutation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(decksData);
    if (decksData === undefined) return;
    const currentDeck = decksData.decks.find((deck) => deck.id === deck_id);
    setCards(currentDeck.cards);
  }, [decksData]);

  function increaseCardInDeckHandler(e) {
    const multiverseId = e.currentTarget.value;
    const object = {
      deckId: deck_id,
      multiverseId: multiverseId,
    };

    console.log(cards);
    const newCards = cards.map((card) => {
      let cardClone = { ...card };
      if (cardClone.multiverse_id == multiverseId) {
        cardClone.quantity++;
      }
      return cardClone;
    });
    setCards(newCards);
    addCardToDeck(object);
  }

  function decreaseCardInDeckHandler(e) {
    const multiverseId = e.currentTarget.value;
    const object = {
      deckId: deck_id,
      multiverseId: multiverseId,
    };
    const newCards = cards
      .map((card) => {
        let cardClone = { ...card };
        if (cardClone.multiverse_id == multiverseId) {
          cardClone.quantity--;
        }
        return cardClone;
      })
      .filter((card) => card.quantity > 0);
    setCards(newCards);
    removeCardFromDeck(object);
  }

  function navigateToDecks() {
    navigate("/decks");
  }

  if (!decksData) {
    return <></>;
  } else {
    return (
      <React.Fragment>
        <Button onClick={navigateToDecks}>Back To Decks</Button>
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
                  <Link to={`/card/${card.multiverse_id}`}>
                    <Image src={card.picture_url} style={{ width: "100%" }} />
                  </Link>
                  <Button
                    value={card.multiverse_id}
                    onClick={increaseCardInDeckHandler}
                  >
                    <FaPlus></FaPlus>
                  </Button>
                  <Button
                    value={card.multiverse_id}
                    onClick={decreaseCardInDeckHandler}
                  >
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
}

export default DeckDetail;
