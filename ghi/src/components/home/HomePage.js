import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./HomePage.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useGetCardNamesQuery } from "../../store/scryfallWebApi";
import { useDispatch } from "react-redux";
import { searchActions, store } from "../../store/store";

function HomePage() {
  const [homepageCards, setHomepageCards] = useState([]);
  const {data: cardNames} = useGetCardNamesQuery();
  const [randomCardName, setRandomCardName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function queryScryfall() {
      // get carousel data
      const colorArray = ["werewolf", "vampire"];
      const randomIndex = Math.floor(Math.random() * 2);
      const search = colorArray[randomIndex];
      const scryfallUrl = `${process.env.REACT_APP_API_HOST}/scryfall/type:${search}`;
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

    if (!randomCardName && !(cardNames === undefined)){
      const allCardNames = cardNames.data;
      setRandomCardName(allCardNames[Math.floor(Math.random()*allCardNames.length)])
    }
  }, [cardNames, randomCardName]);

  homepageCards.forEach((card) => {
    console.log(card);
  });

  const handleGetStarted = () => {
    navigate("/signup");
  }

  function handleGetRandomCard(e) {
    e.preventDefault();
    dispatch(searchActions.updateSearch(randomCardName));
    navigate("/search");
  }

  return (
    <React.Fragment>
      <div className="main-page">
        <Container className="banner px-4  mt-5 text-center rounded">
          <h1 className="display-5 fw-bold color-primary">DeckReactor</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead">
              Manage your Magic the Gathering collection
            </p>
          </div>
        </Container>
        <Container className="mb-5">
          <div className="button-container">
            <Button onClick={handleGetStarted}>Get Started</Button>
            {
              randomCardName === ""
              ?
              <Button
                onClick={handleGetRandomCard}
                disabled
                style={{
                  backgroundColor: "#e8f1fe",
                  border: "solid 1px #1877f2",
                  color: "#1877f2",
                  marginRight: "10px",
                }}
              >
                Random Card
              </Button>
              :
              <Button
                onClick={handleGetRandomCard}
                value={randomCardName}
                style={{
                  backgroundColor: "#e8f1fe",
                  border: "solid 1px #1877f2",
                  color: "#1877f2",
                  marginRight: "10px",
                }}
              >
                Random Card
              </Button>
            }
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
