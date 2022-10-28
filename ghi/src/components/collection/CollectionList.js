import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./collection.css";
import { useGetMyCollectionQuery, useAddCardToCollectionMutation, useRemoveCardFromCollectionMutation } from "../../store/myCardsApi";

export default function MyCollection() {
  let [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  // const [reducerValue, collectionUpdater] = useReducer((x) => x + 1, 0);
  const [search, setSearch] = useState("");
  const [addCardToCollection] = useAddCardToCollectionMutation();
  const [removeCardFromCollection] = useRemoveCardFromCollectionMutation();
  const { data: collectionData, isLoading: collectionIsLoading } = useGetMyCollectionQuery();

  useEffect(() => {
    if (collectionData) {
      setCollection(collectionData.cards);
    }
    if (search === "") {
      setFilteredCollection(collection);
    } else if (search.length > 0) {
      let cardMatches = [];
      collection.forEach(card => {
          if (card.name.toLowerCase().includes(search.toLowerCase())) {
              cardMatches.push(card);
          }
      });
      setFilteredCollection(cardMatches);
    }
  }, [collection, collectionData, search]);

  const handleDelete = (multiverse_id) => {
    removeCardFromCollection({multiverseId: multiverse_id});
  };

  const handleIncrease = (multiverse_id) => {
    addCardToCollection({multiverseId: multiverse_id});
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };



  if (collectionIsLoading) {
    return (
      <div className="container-fluid">
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

  let collection_value = 0;
  let collection_count = 0;

  for (let card of collection) {
    collection_count += Number(card["quantity"]);
    if (card["quantity"] >= 1 && card["card_price"] !== null) {
      collection_value += Number(card["quantity"]) * Number(card["card_price"]);
    }
  }

  if (filteredCollection.length === 0 && search !== "") {
    return (
      <div className="container-fluid">
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
          <p>
            <b>{filteredCollection.length} </b>cards found
          </p>
        </form>
        <div>
          <Link to="/collection" className="right_side">
            My collection
          </Link>
          <b>
            Collection Value:{" "}
            <b className="text-success">${collection_value.toFixed(2)}</b>
          </b>
          <p>
            Total cards in collection: <b>{collection_count}</b>
          </p>
        </div>
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <Table
            striped
            bordered
            hover
            variant="light"
            className="table table-bordered table-striped mb-0"
          >
            <thead>
              <tr>
                <th className="text-center col col-lg-2">Card Name</th>
                <th className="text-center col col-lg-2">Card Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollection.map((row) => {
                if (row.back_picture_url) {
                  return (
                    <tr key={row.multiverse_id}>
                      <td className="text-center">
                        <Link to={`/card/${row.multiverse_id}`}>{row.name}</Link>
                        <br></br>
                        <p className="mt-3">Quantity: {row.quantity}</p>
                        <Button
                          className="mb-1"
                          variant="success"
                          size="xs"
                          onClick={() => handleIncrease(row.multiverse_id)}
                        >
                          Add one card
                        </Button>
                        <br></br>
                        <Button
                          variant="danger"
                          size="xs"
                          onClick={() => handleDelete(row.multiverse_id)}
                        >
                          Remove one card
                        </Button>
                        <p className="mt-3">Card Price: {row.card_price}</p>
                      </td>
                      <td className="text-center">
                        <Link to={`/card/${row.multiverse_id}/`}>
                        <img
                          className="p-1"
                          src={row.picture_url}
                          alt="card_picture"
                          width="170px"
                        />
                        <img
                          className="p-1"
                          src={row.back_picture_url}
                          alt="card_picture"
                          width="170px"
                        />
                        </Link>
                        <br></br>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={row.multiverse_id}>
                      <td className="text-center">
                      <Link to={`/card/${row.multiverse_id}`}>{row.name}</Link>
                      <br></br>
                        <p className="mt-3">Quantity: {row.quantity}</p>
                        <Button
                          className="mb-1"
                          variant="success"
                          size="xs"
                          onClick={() => handleIncrease(row.multiverse_id)}
                        >
                          Add one card
                        </Button>
                        <br></br>
                        <Button
                          variant="danger"
                          size="xs"
                          onClick={() => handleDelete(row.multiverse_id)}
                        >
                          Remove one card
                        </Button>
                        <br></br>
                        <p className="mt-3">Card Price: {row.card_price}</p>
                      </td>
                      <td className="text-center">
                        <Link to={`/card/${row.multiverse_id}/`}>
                        <img
                          className="p-1"
                          src={row.picture_url}
                          alt="card_picture"
                          width="170px"
                        />
                        </Link>
                        <br></br>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
