from fastapi import APIRouter, Depends
from models import CollectionOut, AccountOut
from queries.collections import CollectionQueries
from .authenticator import authenticator
import requests
import json

router = APIRouter(tags=["collections"])


@router.get("/collections/", response_model=CollectionOut)
async def get_user_collection(
    repo: CollectionQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    account_id = account.id
    collection = repo.get_one(account_id)
    return collection


@router.put("/collections/add/{multiverse_id}", response_model=CollectionOut)
async def add_card_to_collection(
    multiverse_id: int,
    repo: CollectionQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    url = f"https://api.scryfall.com/cards/multiverse/{multiverse_id}"
    response = requests.get(url)
    content = json.loads(response.content)
    card_dict = {
        "name": content.get("name"),
        "multiverse_id": content.get("multiverse_ids")[0],
        "card_price": content.get("prices")["usd"],
    }

    if content.get("layout") in [
        "modal_dfc",
        "transform",
    ]:
        card_dict["picture_url"] = (
            content.get("card_faces")[0].get("image_uris").get("normal")
        )
        card_dict["back_picture_url"] = (
            content.get("card_faces")[1].get("image_uris").get("normal")
        )
    else:
        card_dict["picture_url"] = content.get("image_uris").get("normal")

    account = AccountOut(**account_data)
    account_id = account.id
    collection = repo.add_card_to_collection(
        card=card_dict, account_id=account_id
        )

    return CollectionOut(**collection)


@router.put(
    "/collections/remove_one/{multiverse_id}", response_model=CollectionOut
    )
def remove_one_card_from_collection(
    multiverse_id: int,
    repo: CollectionQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    account_id = account.id
    collection = repo.remove_one_card_copy_from_collection(
        multiverse_id=multiverse_id, account_id=account_id
    )
    return collection


@router.put(
    "/collections/remove_all/{multiverse_id}", response_model=CollectionOut
    )
def remove_all_card_copies_from_collection(
    multiverse_id: int,
    repo: CollectionQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        ),
):
    account = AccountOut(**account_data)
    account_id = account.id
    collection = repo.remove_all_card_copies_from_collection(
        multiverse_id=multiverse_id, account_id=account_id
    )
    return collection
