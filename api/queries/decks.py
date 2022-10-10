from bson.objectid import ObjectId
from typing import List
from .client import Queries
from pymongo import ReturnDocument
from models import DeckIn, DeckOut, DeckList, DeckDetailsIn


class DeckQueries(Queries):
  DB_NAME = 'deck_reactor'
  COLLECTION = 'decks'


  def create(self, deck: DeckIn) -> DeckOut:
    deck_dict = deck.dict()
    deck_dict["account_id"] = ObjectId(deck_dict["account_id"])
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
    deck["id"] = str(deck["_id"])
    return deck

  def delete_deck(self, deck_id: str) -> bool:
    self.collection.delete_one({"_id" : ObjectId(f"{deck_id}")})

  def update_deck(self, deck_id: str, deck: DeckIn) -> DeckOut:
    deck_dict = deck.dict()
    self.collection.find_one_and_update({"_id" : ObjectId(deck_id)}, {"$set": deck_dict}, return_document=ReturnDocument.AFTER)

    return DeckOut(**deck_dict, id=deck_id)
    
