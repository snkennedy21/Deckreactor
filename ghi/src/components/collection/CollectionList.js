import Table from "react-bootstrap/Table";
import { useEffect, useState, useReducer } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./collection.css";

// const my_collection = "knight"
const account_id = "634ed235c46bd0e65d85bdae";

export default function MyCollection() {
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);

  // as reducer changes from card removal, useEffect fetches card collection
  const [reducerValue, collectionUpdater] = useReducer((x) => x + 1, 0);

  const handleDelete = (multiverse_id) => {
    fetch(
      `http://localhost:8000/collections/${account_id}/remove_one/${multiverse_id}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
        },
      }
    );
    collectionUpdater();
  };

  // ###################################### handle delete and refetch to update state on ui

  useEffect(() => {
    async function getCollection() {
      // const url = `http://localhost:8000/scryfall/${my_collection}`
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

    // whenever reducer value changes useEffect runs get collection
  }, [reducerValue]);

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
                        {row.name} <br></br>
                        <p className="mt-3">Quantity: {row.quantity}</p>
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
                        <br></br>
                        <Link to={`/card/${row.multiverse_id}`}>
                          <Button vaiant="success">See card details</Button>
                        </Link>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={row.multiverse_id}>
                      <td className="text-center">
                        {row.name} <br></br>
                        <p className="mt-3">Quantity: {row.quantity}</p>
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
                        <img
                          className="p-1"
                          src={row.picture_url}
                          alt="card_picture"
                          width="170px"
                        />
                        <br></br>
                        <Link to={`/card/${row.multiverse_id}`}>
                          <Button vaiant="success">See card details</Button>
                        </Link>
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
