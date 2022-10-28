import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import AddToDeckForm from "./AddToDeckForm";
import ParseSymbolsAndLineBreaks from "./ParseSymbolsAndLineBreaks";
import { useDispatch, useSelector } from "react-redux";
import getBackground from "./getBackground";
import { useGetCardQuery } from "../../store/scryfallWebApi";
import Loading from "../ui/Loading";

function CardDetailPage() {
  const { multiverse_id } = useParams();
  const { data: card, error: cardError, isLoading: cardIsLoading } = useGetCardQuery(multiverse_id);
  const [upsideDown, setUpsideDown] = useState("up");
  const [imageStyle, setImageStyle] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("")

  useEffect(() => {
    if (backgroundUrl === "" && card) {
      const color_id = (card.color_identity.length > 0 ? card.color_identity[0] : "None");
      setBackgroundUrl(getBackground(color_id));
    }
    setImageStyle(`{transform: rotate(${upsideDown === 'up' ? '0' : '180'}deg);}`);
  }, [upsideDown, card])

  if (cardIsLoading || cardError) {
    return (<Loading/>)
  }

  const double_faced = ["transform", "modal_dfc"].includes(card.layout);

  // handle flip layout cards (rotate 180º)
  function toggleUpsideDown() {
    setUpsideDown(upsideDown === "up" ? "down" : "up")
  }

  return (
    <React.Fragment>
    <div className="p-4 img-fluid" style={{
      background: `url(${backgroundUrl}) no-repeat center center fixed`,
      backgroundSize: "cover",
    }}>
      <div className="row">
        <div className="col-sm-6">
          {/* CARD FACES */}
          <div className="card mb-4 box-shadow">
            <div className="card-body img-fluid">
            {
              double_faced ? 
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
              card.layout === "flip"
              ?
              <Card className="bg-white img-fluid rounded shadow d-block mx-auto" style={{ width: '13rem' }}>
              <img className='img-fluid' src={card.image_uris.normal} style={{
                transform: `rotate(${upsideDown === 'up' ? '0' : '180'}deg)`,
                transition: 'all 0.4s 0.2s'
                }} onClick={toggleUpsideDown} />
              </Card>
              :
              card.type_line === "Phenomenon"
              ?
              <Card className="bg-white img-fluid rounded shadow d-block mx-auto" style={{ width: '13rem' }}>
              <img className='img-fluid' style={{transform: `rotate(90deg)`}} src={card.image_uris.normal} />
              </Card>
              :
              <Card className="bg-white img-fluid rounded shadow d-block mx-auto" style={{ width: '13rem' }}>
              <img className='img-fluid' src={card.image_uris.normal} />
              </Card>
            }
            </div>
          </div>
          <React.Fragment>
          { "flavor_text" in card || ("card_faces" in card && ("flavor_text" in card.card_faces[0] || "flavor_text" in card.card_faces[1])) ?
          <div className="card mb-4 box-shadow p-4">
            {
              Object.keys(card).includes("card_faces") ? 
              <React.Fragment>
              { 
              "flavor_text" in card.card_faces[0] ? 
              <p className="fst-italic">{card.card_faces[0].flavor_text}</p>
              :
              <React.Fragment/>
              }
              { 
              "flavor_text" in card.card_faces[1] ? 
              <p className="fst-italic"><ParseSymbolsAndLineBreaks string={card.card_faces[1].flavor_text} /></p>
                :
                <React.Fragment/>
              }
              </React.Fragment>
             : 
              <React.Fragment>{
              "flavor_text" in card ? 
              <p className="fst-italic"><ParseSymbolsAndLineBreaks string={card.flavor_text} /></p> :
              <React.Fragment/>
              }
              </React.Fragment>
            }
          </div>
          :
          <React.Fragment/>
          }
          </React.Fragment>

          {/* FORM CARD */}
          <AddToDeckForm multiverseId={multiverse_id} />
        </div>
        <div className="col-sm-6">
          {/* CARD DETAILS */}
          <div className="card mb-4 box-shadow">
            <div className="card-header"><h1 className="my-2">{card.name}</h1></div>
            <div className="card-body">
              {Object.keys(card).includes("card_faces") ? <React.Fragment/> : <h3>{card.type_line}</h3>}
              {
                Object.keys(card).includes("card_faces")
                ? 
                <React.Fragment>
                <h2>{card.card_faces[0].name}</h2>
                <h4>{card.card_faces[0].type_line}</h4>
                <p><ParseSymbolsAndLineBreaks string={card.card_faces[0].oracle_text} /></p>
                {
                  "power" in card.card_faces[0] && "toughness" in card.card_faces[0]
                  ? 
                  <p className="fw-bold">{card.card_faces[0].power}/{card.card_faces[0].toughness}</p>
                  :
                  <React.Fragment />
                }
                {
                  "loyalty" in card.card_faces[0]
                  ?
                  <p className="fw-bold">Loyalty: {card.card_faces[0].loyalty}</p>
                  :
                  <React.Fragment/>
                }
                <h2>{card.card_faces[1].name}</h2>
                <h4>{card.card_faces[1].type_line}</h4>
                <p><ParseSymbolsAndLineBreaks string={card.card_faces[1].oracle_text} /></p>
                {
                  "power" in card.card_faces[1] && "toughness" in card.card_faces[1]
                  ? 
                  <p className="fw-bold">{card.card_faces[1].power}/{card.card_faces[1].toughness}</p>
                  :
                  <React.Fragment />
                }
                {
                  "loyalty" in card.card_faces[1]
                  ?
                  <p className="fw-bold">Loyalty: {card.card_faces[1].loyalty}</p>
                  :
                  <React.Fragment/>
                }
                </React.Fragment>
                : 
                <React.Fragment>
                  <p><ParseSymbolsAndLineBreaks string={card.oracle_text} /></p>
                  {
                    "power" in card && "toughness" in card
                    ?
                    <p className="fw-bold">{card.power}/{card.toughness}</p>
                    :
                    <React.Fragment/>
                  }
                  {
                    "loyalty" in card
                    ?
                    <p className="fw-bold">Loyalty: {card.loyalty}</p>
                    :
                    <React.Fragment/>
                  }
                </React.Fragment>
              }
              
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <tbody>
                    <tr key="mana cost row">
                      <td>Mana cost:</td>
                      {
                        Object.keys(card).includes("card_faces") ? 
                        <td><ParseSymbolsAndLineBreaks string={card.card_faces[0].mana_cost} /></td>
                        :
                        <td><ParseSymbolsAndLineBreaks string={card.mana_cost} /></td> 
                      }
                      
                    </tr>
                    <tr key="formats row">
                      <td>Legal formats:</td>
                      {
                        Object.entries(card.legalities).filter(format => format[1] === "legal").map(format => format[0]).length === 0 ?
                          <td>None</td> :
                          <td>{Object.entries(card.legalities).filter(format => format[1] === "legal").map(format => format[0]).join(", ")}</td>
                      }
                    </tr>
                    <tr key="set row">
                      <td>Set name:</td>
                      <td>{card.set_name} ({card.released_at.slice(0,4)})</td>
                    </tr>
                    <tr key="artist row">
                      <td>Artist:</td>
                      <td>{card.artist}</td>
                    </tr>
                    <tr key="price row">
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
  </React.Fragment>
  );
}

export default CardDetailPage;
