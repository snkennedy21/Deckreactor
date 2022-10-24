from bson.objectid import ObjectId
from typing import List
from .client import Queries
from pymongo import ReturnDocument
from models import DeckIn, DeckOut, DeckList, DeckDetailsIn, CardIn


class DeckQueries(Queries):
  DB_NAME = 'deck_reactor'
  COLLECTION = 'decks'


  def create(self, deck: DeckIn) -> DeckOut:
    deck_dict = deck.dict()
    deck_dict["account_id"] = ObjectId(deck_dict["account_id"])
    deck_dict["cards"] = []
    self.collection.insert_one(deck_dict)
    deck_dict["id"] = str(deck_dict["_id"])
    deck_dict["account_id"] = str(deck_dict["account_id"])
    return DeckOut(**deck_dict)

  def get_all(self, account_id: str) -> List[DeckOut]:
    decks = []
    database = self.collection.find()
    for doc in database:
        doc["id"] = str(doc["_id"])
        doc["account_id"] = str(doc["account_id"])
        if doc["account_id"] == account_id:
          decks.append(DeckOut(**doc))
    return decks

  def get_one(self, deck_id: str) -> DeckOut:
    deck = self.collection.find_one({"_id" : ObjectId(f"{deck_id}")})
    deck["account_id"] = str(deck["account_id"])
    deck["id"] = str(deck["_id"])
    return deck

  def delete_deck(self, deck_id: str) -> bool:
    self.collection.delete_one({"_id" : ObjectId(f"{deck_id}")})

  def update_deck(self, deck_id: str, deck: DeckIn) -> DeckOut:
    deck_dict = deck.dict()
    self.collection.find_one_and_update({"_id" : ObjectId(deck_id)}, {"$set": deck_dict}, return_document=ReturnDocument.AFTER)

    return DeckOut(**deck_dict, id=deck_id)

  def add_card_to_deck(self, card: dict, deck_id: str) -> DeckOut:
    deck = self.collection.find_one({"_id": ObjectId(deck_id)})
    card_list = deck.get("cards")

    found_in_deck = False
    for card_item in card_list:
      if card_item.get('multiverse_id') == card.get('multiverse_id'):
        card_item['quantity'] += 1
        found_in_deck = True
    
    if not found_in_deck:
      card["quantity"] = 1
      card_list.append(card)
    
    deck["cards"] = card_list

    self.collection.find_one_and_update({"_id" : ObjectId(deck_id)}, {"$set": deck}, return_document=ReturnDocument.AFTER)

    deck["account_id"] = str(deck["account_id"])
    deck["id"] = str(deck["_id"])
    return DeckOut(**deck)

    # get the deck based on the deck_id in card
    # Loop through current cards in the deck.
    # If the card being added already exists:
      # Increase the counter for that card by 1
    # Else:
      # Add a new card object and append it to the list of cards in deck with name, picture_url, and multiverse_id
  
  
  # remove one card of specified multiverse_id from deck
  def remove_one_card_copy_from_deck(self, multiverse_id: int, deck_id: str) -> DeckOut:
    deck = self.collection.find_one({"_id": ObjectId(deck_id)})
    card_list = deck.get("cards")

    for card_item in card_list:
      if card_item.get("multiverse_id") == multiverse_id:
        card_item["quantity"] -= 1
        if card_item["quantity"] == 0:
          card_list.remove(card_item)

    deck["cards"] = card_list

    self.collection.find_one_and_update({"_id": ObjectId(deck_id)}, {"$set": deck}, return_document=ReturnDocument.AFTER)

    deck["account_id"] = str(deck["account_id"])
    deck["id"] = str(deck["_id"])
    return DeckOut(**deck)
  
  def remove_all_card_copies_from_deck(self, multiverse_id: int, deck_id: str) -> DeckOut:
    deck = self.collection.find_one({"_id": ObjectId(deck_id)})
    card_list = deck.get("cards")

    for card_item in card_list:
      if card_item.get("multiverse_id") == multiverse_id:
        card_list.remove(card_item)

    deck["cards"] = card_list

    self.collection.find_one_and_update({"_id": ObjectId(deck_id)}, {"$set": deck}, return_document=ReturnDocument.AFTER)

    deck["account_id"] = str(deck["account_id"])
    deck["id"] = str(deck["_id"])
    return DeckOut(**deck)
  