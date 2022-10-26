import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./HomePage.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

function HomePage() {
  const [homepageCards, setHomepageCards] = useState([]);

  useEffect(() => {
    async function queryScryfall() {
      const colorArray = ["werewolf", "vampire"];

      const randomIndex = Math.floor(Math.random() * 2);
      const search = colorArray[randomIndex];
      const scryfallUrl = `http://localhost:8000/scryfall/${search}`;
      const response = await fetch(scryfallUrl);
      if (response.ok) {
        const cardData = await response.json();
        const array = [];
        let slideObject = {};
        let index = 0;
        cardData.cards.forEach((card, i) => {
          slideObject[index] = card;
          if (i % 4 === 0) {
            array.push(slideObject);
            slideObject = {};
            index = 0;
          }
          index++;
        });
        array.shift();
        setHomepageCards(array);
      }
    }
    queryScryfall();
  }, []);

  homepageCards.forEach((card) => {
    console.log(card);
  });

  return (
    <React.Fragment>
      <div className="main-page">
        <Container className="shadow banner px-4 py-5 mb-5 mt-5 text-center rounded">
          <h1 className="display-5 fw-bold color-primary">DeckReactor</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Manage your Magic the Gathering collection
            </p>
          </div>
        </Container>

        <div>
          <Container className="card-carousel">
            <Carousel style={{ width: "100%" }}>
              {homepageCards.map((cardObject) => {
                return (
                  <Carousel.Item key={cardObject["1"].multiverse_id}>
                    <div style={{ display: "flex" }}>
                      <span className="m-2" style={{ width: "100%" }}>
                        <Link to={`/card/${cardObject["1"].multiverse_id}`}>
                          <img
                            className="d-block w-100"
                            src={cardObject["1"].picture_url}
                            style={{ width: "100%" }}
                          />
                        </Link>
                      </span>
                      <span className="m-2" style={{ width: "100%" }}>
                        <Link to={`/card/${cardObject["2"].multiverse_id}`}>
                          <img
                            className="d-block w-100"
                            src={cardObject["2"].picture_url}
                            style={{ width: "100%" }}
                          />
                        </Link>
                      </span>
                      <span className="m-2" style={{ width: "100%" }}>
                        <Link to={`/card/${cardObject["3"].multiverse_id}`}>
                          <img
                            className="d-block w-100"
                            src={cardObject["3"].picture_url}
                            style={{ width: "100%" }}
                          />
                        </Link>
                      </span>
                      <span className="m-2" style={{ width: "100%" }}>
                        <Link to={`/card/${cardObject["4"].multiverse_id}`}>
                          <img
                            className="d-block w-100"
                            src={cardObject["4"].picture_url}
                            style={{ width: "100%" }}
                          />
                        </Link>
                      </span>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
