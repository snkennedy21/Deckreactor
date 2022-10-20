import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useGetTokenQuery } from "../../store/accountApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deckActions } from "../../store/store";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

function DecksList() {
  const [usersDecks, setUsersDecks] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getDecks() {
      const decksUrl = "http://localhost:8000/decks/";
      const fetchConfig = {
        method: "get",
        credentials: "include",
      };
      const decksResponse = await fetch(decksUrl, fetchConfig);
      if (decksResponse.ok) {
        const decksData = await decksResponse.json();
        setUsersDecks(decksData.decks);
      }
    }
    getDecks();
  }, []);

  function goToDeck(e) {
    dispatch(deckActions.updateId(e.target.value));
    navigate("/deck");
  }

  return (
    <React.Fragment>
      <Nav onSelect={(selectedKey) => navigate(selectedKey)}>
        <Container>
          <Row>
            {usersDecks.map((deck) => {
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
