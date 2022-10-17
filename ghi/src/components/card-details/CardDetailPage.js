import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";
import { useGetCardsQuery } from "../../store/scryfallApi";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

function CardDetailPage() {
  const { multiverse_id } = useParams();
  const [card, setCard] = useState({});
  const [symbol, setSymbol] = useState()
  const [error, setError] = useState({});
  
  useEffect(() => {
    async function getCardData() {
      const cardUrl = `https://api.scryfall.com/cards/multiverse/${multiverse_id}`
      const symbolUrl = "https://api.scryfall.com/symbology";
      const cardResponse = await fetch(cardUrl);
      const symbolResponse = await fetch(symbolUrl);
      if (cardResponse.ok && symbolResponse.ok) {
        const cardData = await cardResponse.json();
        const symbolData = await symbolResponse.json();
        setCard(cardData);
        setSymbol(symbolData);
      } else {
        setError('Could not load page data');
      }
    };
    getCardData();
  });

  if (Object.entries(card).length === 0) {
    return (<>Loading...</>)
  }
  return (
    <>
    
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="card mb-4 box-shadow">
            <div className="card-body">
              <img src={card.image_uris.normal} className="img-fluid  img-rounded my-2" />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card mb-4 box-shadow">
            <div className="card-header"><h1 className="my-2">{card.name}</h1></div>
            <div className="card-body">
              <h3>{card.type_line}</h3>
              <p>{card.oracle_text.split("\n").map(function(item, idx) {
                return (
                  <span key={idx}>
                    {item}
                    <br/>
                  </span>
                )
              })}</p>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <tbody>
                    <tr>
                      <td>Mana cost:</td>
                      <td>{card.mana_cost}</td>
                    </tr>
                    <tr>
                      <td>Legal formats:</td>
                      {
                        Object.entries(card.legalities).filter(format => format[1] === "legal").map(format => format[0]).length === 0 ?
                          <td>None</td> :
                          <td>{Object.entries(card.legalities).filter(format => format[1] === "legal").map(format => format[0]).join(", ")}</td>
                      }
                    </tr>
                    <tr>
                      <td>Set name:</td>
                      <td>{card.set_name} ({card.released_at.slice(0,4)})</td>
                    </tr>
                    <tr>
                      <td>Artist:</td>
                      <td>{card.artist}</td>
                    </tr>
                    <tr>
                      <td>Price (USD):</td>
                      {
                        card.prices.usd === null ?
                        <td>Unknown</td> : 
                        <td>${card.prices.usd}</td>
                      }
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CardDetailPage;
