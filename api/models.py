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


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str

class AccountUpdateIn(BaseModel):
    email: Optional[str]
    password: Optional[str]
    full_name: Optional[str]
    roles: Optional[List[str]]


class Account(AccountIn):
    id: PydanticObjectId
    roles: List[str]


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str
    roles: List[str]


class CardIn(BaseModel):
    name: str
    multiverse_id: int


class Card(CardIn):
    id: PydanticObjectId


class CardOut(CardIn):
    id: str


class CardList(BaseModel):
    cards: List[CardOut]