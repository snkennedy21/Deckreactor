import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCardsQuery } from "../../store/scryfallApi";

function ContainerExample() {
  const [usersDecks, setUsersDecks] = useState([]);

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

  console.log(usersDecks);

  const search = useSelector((state) => state.search);
  const { data, error, isLoading } = useGetCardsQuery(search);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  if (data === undefined) {
    return <div>Banana</div>;
  }

  if ("message" in data) {
    return <div>{data.message}</div>;
  }

  function execute(selectedKey) {
    const eventKeyObject = JSON.parse(selectedKey);
    if (eventKeyObject.placeToStore === "collection") {
    }
  }

  return (
    <Container>
      <Row>
        {data.cards.map((card) => {
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
              <Image
                className="mb-1"
                src={card.picture_url}
                style={{ width: "100%" }}
              />
              <Dropdown className="mb-4" onSelect={execute}>
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
                  {usersDecks.map((deck) => {
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
