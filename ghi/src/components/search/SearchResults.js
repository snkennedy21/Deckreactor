import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Bootstrap Imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../images/logo.png";
import "./LogoSpinner.css";

// RTK Query Imports
import { useGetCardsQuery } from "../../store/scryfallApi";
import { searchActions } from "../../store/store";
import {
  useGetMyDecksQuery,
  useAddCardToCollectionMutation,
  useAddCardToDeckMutation,
} from "../../store/myCardsApi";
import { useGetTokenQuery } from "../../store/accountApi";

function SearchResults() {
  // Hook Declarations
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  // RTK Query Hook Declarations
  const { data: decksData, isLoading: decksDataLoading } = useGetMyDecksQuery();
  const [addCardToDeck] = useAddCardToDeckMutation();
  const [addCardToCollection] = useAddCardToCollectionMutation();
  const { data: accessToken } = useGetTokenQuery();
  const { data: cardData, isLoading: cardDataLoading } =
    useGetCardsQuery(search);

  if (cardDataLoading || decksDataLoading) {
    return (
      <Container>
        <Image src={logo} className="logo-spinner" style={{ width: "6rem" }} />
        <div>Loading results...</div>
      </Container>
    );
  }

  if (cardData === undefined) {
    return (
      <div>
        No search results yet<br></br>Care for a Banana while you wait
      </div>
    );
  }

  if ("message" in cardData) {
    return <div>{cardData.message}</div>;
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

  if (cardData !== undefined && cardData.cards.length === 1) {
    dispatch(searchActions.updateSearch(""));
    navigate(`/card/${cardData.cards[0].multiverse_id}/`);
  }

  console.log(accessToken);

  return (
    <Container>
      <Row>
        {cardData.cards.map((card) => {
          return (
            <Col key={card.multiverse_id} xxl="3" xl="4" l="5" md="6" sm="12">
              <Link to={`/card/${card.multiverse_id}`}>
                <Image
                  className="mb-1"
                  src={card.picture_url}
                  style={{ width: "100%" }}
                />
              </Link>
              {accessToken === null || accessToken === undefined ? (
                <></>
              ) : (
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
              )}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default SearchResults;
