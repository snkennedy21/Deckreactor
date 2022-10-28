import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAddCardToCollectionMutation, useAddCardToDeckMutation, useGetMyCollectionQuery, useGetMyDecksQuery } from "../../store/myCardsApi";
import { useState } from "react";
import { useGetTokenQuery } from "../../store/accountApi";

function AddToDeckForm(props) {
  const { data: decksData } = useGetMyDecksQuery();
  const [ deckId, setDeckId ] = useState("");
  const multiverseId = Number(props.multiverseId);
  const [addCardToDeck] = useAddCardToDeckMutation();
  const { data: collectionData } = useGetMyCollectionQuery();
  const [addCardToCollection] = useAddCardToCollectionMutation();
  const { data: tokenData } = useGetTokenQuery();

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.name === 'deck') {
      if (deckId === "") {
        alert("Please select a deck.")
        return
      }
      addCardToDeck({multiverseId, deckId});
      console.log("new decks", decksData.decks)
    } else if (e.target.name === 'collection') {
      addCardToCollection({multiverseId});
      console.log("new collection", collectionData.cards)
    }
  }

  if (!decksData || !collectionData || !tokenData) {
    return (
      <></>
    );
  }

  return (
    <div className="card mb-4 p-2 box-shadow">
      <Form 
      method="put"
      onSubmit={handleSubmit}
      name='deck'>
        <Form.Select className="mb-2" aria-label="select one of my decks" onChange={(e) => setDeckId(e.target.value)}>
          <option value="">Select a deck</option>
          {decksData.decks.map( selectedDeck => {
            return (
              <option key={`${selectedDeck.name} ${selectedDeck.id}`} value={selectedDeck.id}>{selectedDeck.name}</option>
            )
          })}
        </Form.Select>
        {
          deckId !== "" && decksData.decks.find(deck => deck.id === deckId).cards.map(card => card.multiverse_id).includes(multiverseId)
          ?
          <Button className="mb-2" variant="outline-success" size="sm" type="submit">+ Add more to deck ({decksData.decks.find(deck => deck.id === deckId).cards.find(card => card.multiverse_id === multiverseId).quantity})</Button>
          :
          <Button className="mb-2" variant="outline-success" size="sm" type="submit">+ Add to deck</Button>
        }
      </Form>
      <Form
      method='put'
      onSubmit={handleSubmit}
      name='collection'>
        {
          collectionData.cards.map(card => card.multiverse_id).includes(multiverseId)
          ?
          <Button variant="outline-success" size="sm" type="submit">+ Add more to collection ({collectionData.cards.find(card => card.multiverse_id === multiverseId).quantity})</Button>
          :
          <Button variant="outline-success" size="sm" type="submit">+ Add to Collection</Button>
        }
      </Form>
    </div>
  )
}

export default AddToDeckForm;