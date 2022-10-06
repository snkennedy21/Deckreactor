from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List, Optional


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value

##################
# Account Models #
##################
class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str

class Account(AccountIn):
    id: PydanticObjectId
    roles: List[str]

class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str
    roles: List[str]


###############
# Card Models #
###############
class CardIn(BaseModel):
    name: str
    multiverse_id: int

class Card(CardIn):
    id: PydanticObjectId

class CardOut(CardIn):
    id: str

class CardList(BaseModel):
    cards: List[CardOut]


###############
# Deck Models #
###############
class DeckIn(BaseModel):
    name: str
    description: str

class DeckOut(DeckIn):
    id: str
    name: str
    description: str
    cards: Optional[List[CardOut]]

class Deck(DeckIn):
    id: PydanticObjectId

class DeckList(BaseModel):
    decks: List[DeckOut]