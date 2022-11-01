import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./collection.css";
import { useGetMyCollectionQuery } from "../../store/RTK_Query/myCardsApi";

export default function MyCollection2() {
  const { data: collectionData, isLoading: collectionIsLoading } =
    useGetMyCollectionQuery();
  const [filteredCollection, setFilteredCollection] = useState([]);
  let [collection, setCollection] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    if (collectionData) {
      setCollection(collectionData.cards);
    }
    if (search === "") {
      setFilteredCollection(collection);
    } else if (search.length > 0) {
      let cardMatches = [];
      collection.forEach((card) => {
        if (card.name.toLowerCase().includes(search.toLowerCase())) {
          cardMatches.push(card);
        }
      });
      setFilteredCollection(cardMatches);
    }
  }, [collection, collectionData, search]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  let collection_value = 0;
  let collection_count = 0;

  if (collectionIsLoading) {
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
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  collection = collectionData.cards;

  for (let card of collection) {
    collection_count += Number(card["quantity"]);
    if (card["quantity"] >= 1 && card["card_price"] !== null) {
      collection_value += Number(card["quantity"]) * Number(card["card_price"]);
    }
  }

  if (filteredCollection.length === 0 && search.length > 0) {
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
      <div className="container mb-5">
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
            className="table-wrapper-scroll-y fade-in"
            style={{
              padding: "25px",
              backgroundImage: `url(https://media.magic.wizards.com/images/wallpaper/tasha-the-witch-queen-clb-background-1280x960.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "center",
              backgroundSize: "cover",
              height: "80vh",
            }}
          >
            <Link to="/game">
              <b>.</b>
            </Link>
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
                            <Link to={`/card/${row.multiverse_id}`}>
                              <Card.Img variant="top" src={row.picture_url} />
                            </Link>
                          </Carousel.Item>
                          <Carousel.Item>
                            <Link to={`/card/${row.multiverse_id}`}>
                              <Card.Img
                                variant="top"
                                src={row.back_picture_url}
                              />
                            </Link>
                          </Carousel.Item>
                        </Carousel>
                        <Card.Body>
                          <Link to={`/card/${row.multiverse_id}`}>
                            <Card.Title>{row.name}</Card.Title>
                          </Link>
                          <Card.Text>
                            <b>Card Price: {row.card_price}</b>
                            <br></br>
                            <b>Quantity: {row.quantity}</b>
                            <br></br>
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
                        <div>
                          <Link to={`/card/${row.multiverse_id}`}>
                            <Card.Img
                              as={Image}
                              fluid={true}
                              variant="top"
                              className=""
                              src={row.picture_url}
                            />
                          </Link>
                        </div>
                        <Card.Body>
                          <Link to={`/card/${row.multiverse_id}`}>
                            <Card.Title>{row.name}</Card.Title>
                          </Link>
                          <Card.Text>
                            <b>Card Price: {row.card_price}</b>
                            <br></br>
                            <b>Quantity: {row.quantity}</b>
                            <br></br>
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
