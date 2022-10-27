from bson.objectid import ObjectId
from .client import Queries
from models import Account, AccountIn, AccountUpdateIn, AccountOut
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError
from typing import Union


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = (
        # Specifies which database we're querying or inserting data into
        "deck_reactor"
    )
    COLLECTION = (
        # specifies which collection we're querying or inserting data into
        "accounts"
    )

    def get(self, email: str) -> Account:
        props = self.collection.find_one({"email": email})
        # Query the collection in the database
        # and look for an email that matches the email passed into the function
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)

    def get_all(self) -> list[AccountOut]:
        db = self.collection.find()
        account_emails = []
        for document in db:
            document["id"] = str(document["_id"])
            account_emails.append(AccountOut(**document))
        return account_emails

    def delete(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})

    def update(
        self,
        id: str,
        info: AccountUpdateIn,
        hashed_password: Union[None, str]
    ):
        props = info.dict()
        if hashed_password is not None:
            props["password"] = hashed_password

        try:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": props},
                return_document=ReturnDocument.AFTER,
            )
        except DuplicateKeyError:
            raise DuplicateAccountError()

        return Account(**props, id=id)

    def create(
        self, info: AccountIn, hashed_password: str, roles=["patron"]
    ) -> Account:
        props = info.dict()
        props["password"] = hashed_password
        props["roles"] = roles
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return Account(**props)
