import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAddCardToCollectionMutation, useAddCardToDeckMutation, useGetMyCollectionQuery, useGetMyDecksQuery } from "../../store/myCardsApi";
import { useState } from "react";

function AddToDeckForm(props) {
  const { data: decksData, error: decksError, isLoading: decksIsLoading } = useGetMyDecksQuery();
  const [ deckId, setDeckId ] = useState("");
  const multiverseId = Number(props.multiverseId);
  const [addCardToDeck] = useAddCardToDeckMutation();
  const { data: collectionData, error: collectionError, isLoading: collectionIsLoading } = useGetMyCollectionQuery();
  const [addCardToCollection] = useAddCardToCollectionMutation();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      deckId,
      multiverseId,
    };

    if (e.target.name === 'deck') {
      addCardToDeck(formData);
      console.log("new decks", decksData.decks)
    } else if (e.target.name === 'collection') {
      addCardToCollection(formData);
      console.log("new collection", collectionData.cards)
    }
    
  }

  if (decksIsLoading || collectionIsLoading) {
    return (
      <></>
    );
  }

  return (
    <div className="card mb-4 box-shadow">
      <Form 
      method="put"
      onSubmit={handleSubmit}
      name='deck'>
        <Form.Select aria-label="select one of my decks" onChange={(e) => setDeckId(e.target.value)}>
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
          <Button variant="success" type="submit">+ Add to deck (currently: {decksData.decks.find(deck => deck.id === deckId).cards.find(card => card.multiverse_id === multiverseId).quantity})</Button>
          :
          <Button variant="success" type="submit">+ Add to Deck</Button>
        }
      </Form>
      <Form
      method='put'
      onSubmit={handleSubmit}
      name='collection'>
        {
          collectionData.cards.map(card => card.multiverse_id).includes(multiverseId)
          ?
          <Button variant="success" type="submit">+ Add More to Collection (currently: {collectionData.cards.find(card => card.multiverse_id === multiverseId).quantity})</Button>
          :
          <Button variant="success" type="submit">+ Add to Collection</Button>
        }
      </Form>
    </div>
  )
}

export default AddToDeckForm;