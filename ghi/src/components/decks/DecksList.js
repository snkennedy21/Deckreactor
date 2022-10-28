import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import CreateDeckModal from "./CreateDeckModal";
import { useGetMyDecksQuery } from "../../store/myCardsApi";

function DecksList() {
  // const [usersDecks, setUsersDecks] = useState([]);
  const {data: usersDecks, error: decksError, isLoading: decksIsLoading } = useGetMyDecksQuery();
  const navigate = useNavigate();

  function goToDeck(e) {
    navigate(`/deck/${e.target.value}/`);
  }

  if (decksIsLoading || decksError) {
    return (<>Loading</>)
  }

  return (
    <React.Fragment>
      <CreateDeckModal />
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
