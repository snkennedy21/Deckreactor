from bson.objectid import ObjectId
from .client import Queries
from pymongo import ReturnDocument
from models import CollectionIn, CollectionOut


class CollectionQueries(Queries):
    DB_NAME = "deck_reactor"
    COLLECTION = "collections"

    def create(self, collection: CollectionIn) -> CollectionOut:
        collection_dict = collection.dict()
        collection_dict["account_id"] = ObjectId(collection_dict["account_id"])
        collection_dict["cards"] = []
        self.collection.insert_one(collection_dict)
        collection_dict["id"] = str(collection_dict["_id"])
        collection_dict["account_id"] = str(collection_dict["account_id"])
        return CollectionOut(**collection_dict)

    def get_one(self, account_id: str) -> CollectionOut:
        collection = self.collection.find_one({
            "account_id": ObjectId(account_id)
            })
        collection["id"] = str(collection["_id"])
        collection["account_id"] = str(collection["account_id"])
        return collection

    def delete_collection(self, account_id: str) -> bool:
        self.collection.delete_one({"account_id": ObjectId(account_id)})

    def add_card_to_collection(
        self, 
        card: dict, 
        account_id: str
        ) -> CollectionOut:
        collection = self.collection.find_one({
            "account_id": ObjectId(account_id)
            })
        card_list = collection.get("cards")

        found_in_collection = False
        for card_item in card_list:
            if card_item.get("multiverse_id") == card.get("multiverse_id"):
                card_item["quantity"] += 1
                found_in_collection = True

        if not found_in_collection:
            card["quantity"] = 1
            card_list.append(card)

        collection["cards"] = card_list

        self.collection.find_one_and_update(
            {"account_id": ObjectId(account_id)},
            {"$set": collection},
            return_document=ReturnDocument.AFTER,
        )

        collection["account_id"] = str(collection["account_id"])
        collection["id"] = str(collection["_id"])
        return collection

    def remove_one_card_copy_from_collection(
        self, multiverse_id: int, account_id: str
    ) -> CollectionOut:
        collection = self.collection.find_one({
            "account_id": ObjectId(account_id)
            })
        card_list = collection.get("cards")

        for card_item in card_list:
            if card_item.get("multiverse_id") == multiverse_id:
                card_item["quantity"] -= 1
                if card_item["quantity"] == 0:
                    card_list.remove(card_item)

        collection["cards"] = card_list

        self.collection.find_one_and_update(
            {"account_id": ObjectId(account_id)},
            {"$set": collection},
            return_document=ReturnDocument.AFTER,
        )

        collection["id"] = str(collection["_id"])
        collection["account_id"] = str(collection["account_id"])
        return collection

    def remove_all_card_copies_from_collection(
        self, multiverse_id: int, account_id: str
    ) -> CollectionOut:
        collection = self.collection.find_one({
            "account_id": ObjectId(account_id)
            })
        card_list = collection.get("cards")

        for card_item in card_list:
            if card_item.get("multiverse_id") == multiverse_id:
                card_list.remove(card_item)

        collection["cards"] = card_list

        self.collection.find_one_and_update(
            {"account_id": ObjectId(account_id)},
            {"$set": collection},
            return_document=ReturnDocument.AFTER,
        )

        collection["account_id"] = str(collection["account_id"])
        collection["id"] = str(collection["_id"])

        return collection
