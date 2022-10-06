from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import DeckIn, DeckOut


class DeckQueries(Queries):
  DB_NAME = 'deck_reactor'
  COLLECTION = 'decks'


  def create(self, deck: DeckIn) -> DeckOut:
    deck_dict = deck.dict()
    self.collection.insert_one(deck_dict)
    deck_dict["id"] = str(deck_dict["_id"])
    return DeckOut(**deck_dict)

  def get_all():
    pass

  def get_one():
    pass