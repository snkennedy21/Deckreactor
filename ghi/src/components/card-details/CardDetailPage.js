import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";
import { useGetCardsQuery } from "../../store/scryfallApi";
import { Form, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

function CardDetailPage() {
  const { multiverse_id } = useParams();
  const [card, setCard] = useState({});
  const [myDecks, setMyDecks] = useState([]);
  const [deck, setDeck] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [error, setError] = useState({});
  
  useEffect(() => {
    async function getCardData() {
      const cardUrl = `https://api.scryfall.com/cards/multiverse/${multiverse_id}`
      const symbolUrl = "https://api.scryfall.com/symbology";
      const myDecksUrl = `${process.env.REACT_APP_API_HOST}/decks/`;
      console.log(myDecksUrl);
      const cardResponse = await fetch(cardUrl);
      const symbolResponse = await fetch(symbolUrl);
      // const myDecksResponse = await fetch(myDecksUrl);
      if (cardResponse.ok && symbolResponse.ok) {
        const cardData = await cardResponse.json();
        const symbolData = await symbolResponse.json();
        // const myDecksData = await myDecksResponse.json();
        setCard(cardData);
        setSymbols(symbolData.data);
        // setMyDecks(myDecksData.decks);
      } else {
        setError('Could not load page data');
      }
    };
    getCardData();
  }, []);

  if (Object.entries(card).length === 0) {
    return (<>Loading...</>)
  }

  const double_faced = ["transform", "modal_dfc"].includes(card.layout);
  const color_id = (card.color_identity.length > 0 ? card.color_identity[0] : "None")

  const red_themes = [
    "https://media.magic.wizards.com/images/wallpaper/wrenn-and-six-2x2-background-2560x1600.jpg",
    "https://media.magic.wizards.com/images/wallpaper/koll_the_forgemaster_khm_2560x1600_wallpaper_0.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Blood_Sun_RIX_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Chandra_PW_2560x1600_Wallpaper.jpg",
  ];
  const white_themes = [
    "https://media.magic.wizards.com/images/wallpaper/CityofBrass_MMA_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Azor-the-Lawbringer_RIX_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Angelic-Page_A25_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Weatherlight_DAR_2560x1600_Wallpaper.jpg",
  ];
  const black_themes = [
    "https://media.magic.wizards.com/images/wallpaper/Wallpaper_Erebos_God_ofthe_Dead_2560x1600.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Campaign-of-Vengeance_EMN_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/PollutedDelta_2560x1600_Wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/callofthenightwing_GTC_2560x1600_Wallpaper.jpg",
  ];
  const blue_themes = [
    "https://media.magic.wizards.com/images/wallpaper/grand-arbiter-augustin-iv-2x2-background-2560x1600.jpg",
    "https://media.magic.wizards.com/images/wallpaper/422742_inquisitor_greyfax_2560x1600_wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/tidechannel-pathway_khm_2560x1600_wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/tidechannel-pathway_khm_2560x1600_wallpaper.jpg",
  ];
  const green_themes = [
    "https://media.magic.wizards.com/images/wallpaper/sparas_headquarters_kieran_yanner_2560x1600_wpoozxbqpcw.jpg",
    "https://media.magic.wizards.com/images/wallpaper/quandrixcommand_stx_2560x1600_wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/timbercrown-pathway_sld_2560x1600_wallpaper.jpg",
    "https://media.magic.wizards.com/images/wallpaper/Tarmogoyf_DGM_2560x1600_Wallpaper.jpg",
  ];

  const themes_by_color = {
    "R": red_themes,
    "W": white_themes,
    "B": black_themes,
    "G": green_themes,
    "U": blue_themes,
    "None": red_themes.concat(white_themes, black_themes, green_themes, blue_themes),
  }

  // get random url from color theme
  const background_url = themes_by_color[color_id][Math.floor(Math.random() * themes_by_color[color_id].length)];


  return (
    <>
    <div className="p-4 img-fluid" style={{
      background: `url(${background_url}) no-repeat center center fixed`,
      backgroundSize: "cover",
      height: "100%",
    }}>
      <div className="row">
        <div className="col-sm-6">
          <div className="card mb-4 box-shadow">
            <div className="card-body img-fluid">
            {
              ["transform", "modal_dfc"].includes(card.layout) ? 
              <Card className="bg-white img-fluid rounded shadow d-block mx-auto" style={{ width: '13rem' }}>
                <Carousel className="img-fluid">
                    <Carousel.Item>
                        <img className="img-fluid" src={card.card_faces[0].image_uris.normal}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="img-fluid" src={card.card_faces[1].image_uris.normal}/>
                    </Carousel.Item>
                </Carousel>
              </Card> : 
              <Card className="bg-white img-fluid rounded shadow d-block mx-auto" style={{ width: '13rem' }}>
              <img className="img-fluid" src={card.image_uris.normal}/>
              </Card>
            }
            </div>
          </div>
          <>
          { "flavor_text" in card || ("card_faces" in card && ("flavor_text" in card.card_faces[0] || "flavor_text" in card.card_faces[1])) ?
          <div className="card mb-4 box-shadow p-4">
            {
              double_faced ? 
              <>
              { 
              "flavor_text" in card.card_faces[0] ? 
              <p className="fst-italic">{card.card_faces[0].flavor_text.split("\n").map(function(item,idx) {
                  return (
                    <span key={idx}>
                      {item}
                      <br/>
                    </span>
                  )
                })}</p>
                :
                <></>
              }
              { 
              "flavor_text" in card.card_faces[1] ? 
              <p className="fst-italic">{card.card_faces[1].flavor_text.split("\n").map(function(item,idx) {
                  return (
                    <span key={idx}>
                      {item}
                      <br/>
                    </span>
                  )
                })}</p>
                :
                <></>
              }
              </>
             : 
              <>{
              "flavor_text" in card ? 
              <p className="fst-italic">{card.flavor_text.split("\n").map(function(item,idx) {
                  return (
                    <span key={idx}>
                      {item}
                      <br/>
                    </span>
                  )
                })}</p> :
              <></>
              }
              </>
            }
          </div>
          :
          <></>
          }
          </>
          <div className="card mb-4 box-shadow">
            <div className="card-body img-fluid">
              Form will go here
              {/* <Form>
                <Form.Label>Add to deck</Form.Label>
                <Form.Select
                aria-label="select one of my decks"
                onChange={(e) => setDeck(e.target.value)}>
                  <option value="">Select a deck</option>
                  {myDecks.map(deck => {
                    return (
                      <option value={deck.id}>{deck.name}</option>
                    )
                  })}
                </Form.Select>
              </Form> */}
              
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card mb-4 box-shadow">
            <div className="card-header"><h1 className="my-2">{card.name}</h1></div>
            <div className="card-body">
              {double_faced ? <></> : <h3>{card.type_line}</h3>}
              {
                double_faced ? 
                <>
                <h2>{card.card_faces[0].name}</h2>
                <h4>{card.card_faces[0].type_line}</h4>
                <p>{card.card_faces[0].oracle_text.split("\n").map(function(item,idx) {
                  return (
                    <span key={idx}>
                      {item}
                      <br/>
                    </span>
                  )
                })}</p>
                <h2>{card.card_faces[1].name}</h2>
                <h4>{card.card_faces[1].type_line}</h4>
                <p>{card.card_faces[1].oracle_text.split("\n").map(function(item,idx) {
                  return (
                    <span key={idx}>
                      {item}
                      <br/>
                    </span>
                  )
                })}</p>
                </>: 
                <p>{card.oracle_text.split("\n").map(function(item, idx) {
                return (
                  <span key={idx}>
                    {item}
                    <br/>
                  </span>
                )
              })}</p>
              }
              
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <tbody>
                    <tr>
                      <td>Mana cost:</td>
                      {
                        double_faced ? 
                        <td>{card.card_faces[0].mana_cost}</td> :
                        <td>{card.mana_cost}</td> 
                      }
                      
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
