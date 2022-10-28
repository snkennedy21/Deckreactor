// react imports
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// bootstrap imports
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

// store imports
import { useGetTokenQuery } from "../../store/accountApi";
import { deckActions } from "../../store/store";

// other imports
import CreateDeckModal from "./CreateDeckModal";
import { useGetMyDecksQuery } from "../../store/myCardsApi";
import Loading from "../ui/Loading";
import { getAverageCmc, getLegalities, getDominantColors } from "./DeckDetail";
import ParseSymbolsAndLineBreaks from "../card-details/ParseSymbolsAndLineBreaks";

export function getDeckCardQuantity(deck) {
  let quantity = 0;
  if (deck.cards === undefined || deck.cards.length === 0) {
    return quantity;
  }
  for (let card of deck.cards) {
    quantity += card.quantity;
  }
  return quantity;
}

function DecksList() {
  // const [usersDecks, setUsersDecks] = useState([]);
  const {data: usersDecks, error: decksError, isLoading: decksIsLoading } = useGetMyDecksQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToDeck(e) {
    // dispatch(deckActions.updateId(e.target.value));
    navigate(`/deck/${e.target.value}/`);
  }

  if (decksIsLoading || decksError) {
    return (<Loading/>)
  }

  return (
    <React.Fragment>
      <div><CreateDeckModal /></div>
      
      <div className="table-wrap">
        <table className="table myaccordion table-hover" id="accordion">
          <thead>
            <tr>
              <th>Deck Name</th>
              <th>Cards</th>
              <th>Colors</th>
              <th>Average Mana Cost</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {usersDecks.decks.map((deck) => {
              const colors = getDominantColors(deck);
              const colorsMana = (colors.length === 2 ? `{${colors[0]}}{${colors[1]}}` : colors.length === 1 ? `{${colors[0]}}` : "");
              return (
                <React.Fragment key={deck.name}>
                  <tr data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour" className="">
                    <th scope="row"><Link to={`/deck/${deck.id}/`}><ParseSymbolsAndLineBreaks string={deck.name}/></Link></th>
                    <td>{getDeckCardQuantity(deck)}</td>
                    <td><ParseSymbolsAndLineBreaks string={colorsMana}/></td>
                    <td>{getAverageCmc(deck)}</td>
                    <td>$TBD</td>
                  </tr>
                  <tr>
                    <td colSpan="5" id="collapseFour" className="acc collapse show" data-parent="#accordion">
                      <p style={{textAlign: "center"}}><ParseSymbolsAndLineBreaks string={deck.description}/></p>
                    </td>
                  </tr>
                </React.Fragment>
              )
            })}


          </tbody>
        </table>
      </div>








      
      <Nav onSelect={(selectedKey) => navigate(selectedKey)}>
        <Container>
          <Row>
            {usersDecks.decks.map((deck) => {
              return (
                <Col className="text-center" key={deck.id}>
                  <div>{deck.name}</div>
                  <Button onClick={goToDeck} value={deck.id}>
                    View Deck
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Nav>
    </React.Fragment>
  );
}

export default DecksList;
