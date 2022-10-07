from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import DeckIn, DeckOut, DeckList


class DeckQueries(Queries):
  DB_NAME = 'deck_reactor'
  COLLECTION = 'decks'


  def create(self, deck: DeckIn) -> DeckOut:
    deck_dict = deck.dict()
    self.collection.insert_one(deck_dict)
    deck_dict["id"] = str(deck_dict["_id"])
    return DeckOut(**deck_dict)

  def get_all(self) -> List[DeckOut]:
    decks = []
    database = self.collection.find()
    for doc in database:
        doc["id"] = str(doc["_id"])
        decks.append(DeckOut(**doc))
    return decks

  def get_one(self, deck_id: str) -> DeckOut:
    deck = self.collection.find_one({"_id" : ObjectId(f"{deck_id}")})
    deck["id"] = str(deck["_id"])
    return deck

  def delete_deck(self, deck_id: str) -> bool:
    self.collection.delete_one({"_id" : ObjectId(f"{deck_id}")})
    



