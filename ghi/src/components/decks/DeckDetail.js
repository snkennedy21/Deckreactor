import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  useGetMyDecksQuery,
  useAddCardToDeckMutation,
  useRemoveOneCardFromDeckMutation,
} from "../../store/myCardsApi";
import { useGetTokenQuery } from "../../store/accountApi";
import getBackground from "../card-details/getBackground";
import ParseSymbolsAndLineBreaks from "../card-details/ParseSymbolsAndLineBreaks";

function DeckDetail() {
  const [cards, setCards] = useState([]);
  const { deck_id } = useParams();
  const [currentDeck, setCurrentDeck] = useState({})
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
  const [legalities, setLegalities] = useState([]);
  const [lostLegalities, setLostLegalities] = useState([]);

  useEffect(() => {
    if (decksData === undefined) return;
    
    const newCurrentDeck = decksData.decks.find((deck) => deck.id === deck_id);
    setCurrentDeck(newCurrentDeck)
    setAverageCmc(getAverageCmc(newCurrentDeck));

    if (Object.keys(newCurrentDeck).includes("cards")) {
      setCards(newCurrentDeck.cards);
    }
    
    if (cards) {
      let colors = getDominantColors({cards});
      let primary = (colors ? colors[0] : "");
      setDominantColors(colors);
      setPrimaryColor(primary);
      if (backgroundUrl === "") {
        setBackgroundUrl(getBackground(primary));
      }
      const newLegalities = getLegalities({cards});
      setLegalities(newLegalities);
    }
    // if (legalities) {
    //   const newLostLegalities = legalities.filter(legality => !(newLegalities.includes(legality)))
  
    //   if (lostLegalities.sort().join(',') !== newLostLegalities.sort().join(',')) {
    //     setLostLegalities(newLostLegalities);
    //   }
    // }

  }, [decksData, primaryColor, cards, currentDeck, backgroundUrl]);

  // when passed a deck object with "cards" attribute, returns a 1-2 char string
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

  // when passed a deck object with "cards" attribute, returns an array of
  // only formats legal for all cards in deck
  function getLegalities(deck) {
    if (!Object.keys(deck).includes("cards") && (deck.cards).length > 0) {return}
    const formatsArray = (deck.cards).map(card => card.formats);
    let outputFormats = formatsArray[0];
    for (let cardFormats of formatsArray) {
      outputFormats = outputFormats.filter(format => cardFormats.includes(format));
    }
    return outputFormats
  }

  // returns a string of the average CMC (converted mana cost)
  // of input deck object, rounded to 2 places
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

  // returns a string of the total price of deck
  function getDeckValue(deck) {
    return deck.cards.reduce((a, b) => a + (b.price * b.quantity))
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

  if (decksData && currentDeck && !cards) {
    return (
    <div className="p-4 img-fluid" style={{
      background: `url(${backgroundUrl}) no-repeat center center fixed`,
      backgroundSize: "cover",
      }}>
      <div className="row">
        <div className="col-sm-6">
          {/* DECK OVERVIEW */}
          <div className="card mb-4 box-shadow">
            <div className="card-header"><h1 className="my-2"><ParseSymbolsAndLineBreaks string={currentDeck.name} /></h1></div>
            <div className="card-body">
              <ParseSymbolsAndLineBreaks string={Object.keys(currentDeck).includes("description") ? currentDeck.description : ""}></ParseSymbolsAndLineBreaks>
              <br></br>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <tbody>
                    <tr key="mana symbols row">
                      <td><ParseSymbolsAndLineBreaks string={dominantColors.length == 2 ? `{${dominantColors[0]}}{${dominantColors[1]}}` : dominantColors.length == 1 ? `{${dominantColors[0]}}` : ''}></ParseSymbolsAndLineBreaks></td>
                      <td></td>
                    </tr>
                    <tr key="Value row">
                      <td>Value:</td>
                      <td className="text-success">$0.00</td>
                    </tr>
                    <tr key="mana cost row">
                      <td>Average mana cost:</td>
                      <td>0.00</td>
                    </tr>
                    <tr key="formats row">
                      <td>Legal formats:</td>
                      <td>None</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          {/* DECK CARD DETAILS */}
          <div className="card mb-4 box-shadow">
            <div className="card-body img-fluid"> 
              <Card className="bg-white img-fluid rounded shadow d-block mx-auto" style={{ width: '13rem' }}>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  } else if (decksData && currentDeck && cards) {
    return (
    <React.Fragment>
      <div className="p-4 img-fluid" style={{
      background: `url(${backgroundUrl}) no-repeat center center fixed`,
      backgroundSize: "cover",
      }}>
      <div className="row">
        <div className="col-sm-6">
          {/* DECK OVERVIEW */}
          <div className="card mb-4 box-shadow">
            <div className="card-header"><h1 className="my-2"><ParseSymbolsAndLineBreaks string={currentDeck.name} /></h1></div>
            <div className="card-body">
              <ParseSymbolsAndLineBreaks string={currentDeck.description}></ParseSymbolsAndLineBreaks>
              <br></br>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <tbody>
                    <tr key="mana symbols row">
                      <td><ParseSymbolsAndLineBreaks string={dominantColors.length == 2 ? `{${dominantColors[0]}}{${dominantColors[1]}}` : dominantColors.length == 1 ? `{${dominantColors[0]}}` : ''}></ParseSymbolsAndLineBreaks></td>
                      <td></td>
                    </tr>
                    <tr key="mana cost row">
                      <td>Average mana cost:</td>
                      <td>{averageCmc}</td>
                    </tr>
                    <tr key="formats row">
                      <td>Legal formats:</td>
                      <td>{legalities ? legalities.join(', ') : "None"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          {/* DECK CARD DETAILS */}
          <div className="card mb-4 box-shadow">
            <div className="card-body img-fluid"> 
              <Card className="bg-white img-fluid rounded shadow d-block mx-auto" style={{ width: '13rem' }}>
              </Card>
            </div>
          </div>
        </div>
      </div>
      </div>
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
  } else {
    return (
      <>
        <Button onClick={navigateToDecks}>Back To Decks</Button>
        <p>Loading...</p>
      </>
    );
  }
}

export default DeckDetail;
