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
import getBackground from "../card-details/getBackground";

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
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [dominantColors, setDominantColors] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [averageCmc, setAverageCmc] = useState("");

  useEffect(() => {
    if (decksData === undefined) return;
    
    const currentDeck = decksData.decks.find((deck) => deck.id === deck_id);
    setAverageCmc(getAverageCmc(currentDeck));

    if (cards.length === 0) {
      setCards(currentDeck.cards);
    }

    let colors = getDominantColors(currentDeck);
    let primary = (colors ? colors[0] : "");
    setDominantColors(colors);
    setPrimaryColor(primary);
    if (backgroundUrl === "") {
      setBackgroundUrl(getBackground(primary));
    }
  }, [decksData, primaryColor, cards]);

  // when passed a deck object, returns a 1-2 char string
  // with 2 mana colors most commonly found in card mana costs
  function getDominantColors(deck) {
    const colorCounts = {}

    // generate string combining mana cost of all cards
    let manaString = ""
    for (let card of deck.cards) {
      if (card.mana !== null) {
        let currentMana = card.mana;
        manaString += currentMana.repeat(card.quantity);
      }
    }

    console.log(manaString);

    // count up instances of colored mana cost
    for (let i=0; i<manaString.length-2; i++) {
      if (manaString[i] === "{" && manaString[i+2] === "}") {
        if ('RGBUW'.includes(manaString[i+1])) {
          let color = manaString[i+1];
          if (!Object.keys(colorCounts).includes(color)) {
            colorCounts[color] = 0
          }
          colorCounts[color]++;
        }
      }
    }

    console.log(colorCounts);

    // set outputs by checking which colors occurred most frequently
    let color1 = "";
    let color2 = "";
    let amount1 = 0;
    let amount2 = 0;

    const sortedCounts = Object.entries(colorCounts).sort((a,b) => b[1]-a[1]);

    if (sortedCounts.length > 0) {
      color1 = sortedCounts[0][0];
      if (sortedCounts.length > 1) {
        color2 = sortedCounts[1][0];
      }
    }

    return color1 + color2;
  }

  // returns a string of the average CMC (converted mana cost)
  // of input deck (rounded to 2 places, formatted as a string)
  function getAverageCmc(deck) {
    if (deck.cards === undefined || deck.cards.length === 0) {
      return (0).toFixed(2);
    }

    let cmcSum = 0;
    let cardQuantity = 0;
    for (let card of deck.cards) {
      cmcSum += card.cmc * card.quantity;
      cardQuantity += card.quantity;
    }

    const average = cmcSum / cardQuantity;
    return average.toFixed(2)
  }

  function increaseCardInDeckHandler(e) {
    const multiverseId = e.currentTarget.value;
    const object = {
      deckId: deck_id,
      multiverseId: multiverseId,
    };

    const newCards = cards.map((card) => {
      let cardClone = { ...card };
      if (cardClone.multiverse_id == multiverseId) {
        cardClone.quantity++;
      }
      return cardClone;
    });
    setCards(newCards);
    addCardToDeck(object);

    let newDominantColors = getDominantColors({cards: newCards});
    if (newDominantColors !== dominantColors) {
      setDominantColors(newDominantColors);
      const newPrimary = (newDominantColors ? newDominantColors[0] : "");
      if (newPrimary !== primaryColor) {
        setPrimaryColor(newPrimary);
        setBackgroundUrl(getBackground(newPrimary));
      }
    }
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

    let newDominantColors = getDominantColors({cards: newCards});
    if (newDominantColors !== dominantColors) {
      setDominantColors(newDominantColors);
      const newPrimary = (newDominantColors ? newDominantColors[0] : "");
      if (newPrimary !== primaryColor) {
        setPrimaryColor(newPrimary);
        setBackgroundUrl(getBackground(newPrimary));
      }
    }
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
