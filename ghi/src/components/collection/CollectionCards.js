import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./collection.css";

// const my_collection = "knight"
const account_id = "634dee76571cdd381634590d";

export default function MyCollection2() {
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);

  useEffect(() => {
    async function getCollection() {
      //   const url = `http://localhost:8000/scryfall/${my_collection}`
      const url = `http://localhost:8000/collections/${account_id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(`${data.cards.length} card(s) rendered`);
        setCollection(data.cards);
        setFilteredCollection(data.cards);
      }
    }
    getCollection();
  }, []);

  const handleInputChange = (event) => {
    let search = event.target.value.toLowerCase();
    let cardMatches = [];
    collection.forEach((card) => {
      if (card.name.toLowerCase().includes(search)) {
        cardMatches.push(card);
      }
    });
    setFilteredCollection(cardMatches);
  };

  let collection_value = 0;
  let collection_count = 0;

  for (let card of collection) {
    collection_count += Number(card["quantity"]);
    if (card["quantity"] >= 1 && card["card_price"] !== null) {
      collection_value += Number(card["quantity"]) * Number(card["card_price"]);
    }
  }

  if (filteredCollection.length === 0) {
    return (
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          id="search-collection-form"
        >
          <div className="input-group mb-3 p-4">
            <input
              onChange={handleInputChange}
              className="form-control"
              name="searchCOLLECTION"
              id="searchCOLLECTION"
              type="search"
              placeholder="Search collection"
            />
          </div>
        </form>
        <div className="container">
          <h1>Collection List</h1>
          <p>No cards found from your search</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          id="search-collection-form"
        >
          <div className="input-group mb-3 p-4">
            <input
              onChange={handleInputChange}
              className="form-control"
              name="searchCOLLECTION"
              id="searchCOLLECTION"
              type="search"
              placeholder="Search collection"
            />
          </div>
          <p>Results: {filteredCollection.length}</p>
        </form>
        <Link to="/edit_collection" className="right_side">
          Edit collection
        </Link>
        <b>
          Collection Value:{" "}
          <b className="text-success">${collection_value.toFixed(2)}</b>
        </b>
        <p>Total cards in collection: {collection_count.toFixed(0)}</p>
        <div>
          <Container
            fluid="md"
            className="table-wrapper-scroll-y"
            style={{
              padding: "25px",
              backgroundImage: `url(https://media.magic.wizards.com/images/wallpaper/tasha-the-witch-queen-clb-background-1280x960.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "center",
              backgroundSize: "cover",
              height: "80vh",
            }}
          >
            <Row className="table table-bordered table-striped mb-0 my-custom-scrollbar">
              {filteredCollection.map((row) => {
                if (row.back_picture_url) {
                  return (
                    <Col key={row.multiverse_id}>
                      <Card
                        className="bg-white rounded shadow d-block mx-auto mb-4"
                        style={{ width: "15rem" }}
                      >
                        <Carousel>
                          <Carousel.Item>
                            <Card.Img variant="top" src={row.picture_url} />
                          </Carousel.Item>
                          <Carousel.Item>
                            <Card.Img
                              variant="top"
                              src={row.back_picture_url}
                            />
                          </Carousel.Item>
                        </Carousel>
                        <Card.Body>
                          <Card.Title>{row.name}</Card.Title>
                          <Card.Text>
                            <b>Card Price: {row.card_price}</b>
                            <br></br>
                            <b>Quantity: {row.quantity}</b>
                            <br></br>
                            <Link to={`/card/${row.multiverse_id}`}>
                              See card details
                            </Link>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                } else {
                  return (
                    <Col key={row.multiverse_id}>
                      <Card
                        className="bg-white rounded shadow d-block mx-auto mb-4"
                        style={{ width: "15rem" }}
                      >
                        <Card.Img variant="top" src={row.picture_url} />
                        <Card.Body>
                          <Card.Title>{row.name}</Card.Title>
                          <Card.Text>
                            <b>Card Price: {row.card_price}</b>
                            <br></br>
                            <b>Quantity: {row.quantity}</b>
                            <br></br>
                            <Link to={`/card/${row.multiverse_id}`}>
                              See card details
                            </Link>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                }
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
