import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCardsQuery } from "../../store/scryfallApi";

import {
  useGetMyDecksQuery,
  useAddCardToCollectionMutation,
  useAddCardToDeckMutation,
} from "../../store/myCardsApi";

function ContainerExample() {
  const [usersDecks, setUsersDecks] = useState([]);

  const [addCardToDeck, { addToDeckError, isLoading: addCardToDeckLoading }] =
    useAddCardToDeckMutation();
  const [
    addCardToCollection,
    { addToCollectionError, isLoading: addCardToCollectionLoading },
  ] = useAddCardToCollectionMutation();
  const {
    data: decksData,
    getDeckError,
    isLoading: decksLoading,
  } = useGetMyDecksQuery();

  const search = useSelector((state) => state.search);
  const { data, error, isLoading } = useGetCardsQuery(search);

  console.log(decksData);

  if (isLoading) {
    return (
      <Container>
        <Spinner animation="grow" />
      </Container>
    );
  }

  if (data === undefined) {
    return <div>Banana</div>;
  }

  if ("message" in data) {
    return <div>{data.message}</div>;
  }

  async function addCard(selectedKey) {
    const eventKeyObject = JSON.parse(selectedKey);
    const multiverseId = eventKeyObject.multiverseId;
    if (eventKeyObject.placeToStore === "collection") {
      addCardToCollection({ multiverseId });
    } else {
      const deckId = eventKeyObject.placeToStore;
      addCardToDeck({ multiverseId, deckId });
    }
  }

  return (
    <Container>
      <Row>
        {data.cards.map((card) => {
          return (
            <Col key={card.multiverse_id} xxl="3" xl="4" l="5" md="6" sm="12">
              <Link to={`/card/${card.multiverse_id}`}>
                <Image
                  className="mb-1"
                  src={card.picture_url}
                  style={{ width: "100%" }}
                />
              </Link>
              <Dropdown className="mb-4" onSelect={addCard}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Add To
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey={JSON.stringify({
                      placeToStore: "collection",
                      multiverseId: card.multiverse_id,
                    })}
                  >
                    My Collection
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {decksData.decks.map((deck) => {
                    return (
                      <Dropdown.Item
                        key={deck.id}
                        eventKey={JSON.stringify({
                          placeToStore: deck.id,
                          multiverseId: card.multiverse_id,
                        })}
                      >
                        {deck.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ContainerExample;
