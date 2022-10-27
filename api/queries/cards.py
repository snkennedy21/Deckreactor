from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import CardIn, CardOut


class CardQueries(Queries):
    DB_NAME = "deck_reactor"
    COLLECTION = "cards"

    def create(self, card: CardIn) -> CardOut:
        props = card.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return CardOut(**props)

    def get_all(self) -> List[CardOut]:
        cards = []
        db = self.collection.find()
        for document in db:
            document["id"] = str(document["_id"])
            cards.append(CardOut(**document))
        return cards
