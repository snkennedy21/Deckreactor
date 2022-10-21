from fastapi import APIRouter, Depends, HTTPException, status
from models import CollectionIn, CollectionOut
from queries.collections import CollectionQueries
from .authenticator import authenticator
from typing import List
import requests
import json

router = APIRouter(tags=["collections"])

@router.get('/collections/{account_id}', response_model=CollectionOut)
async def get_user_collection(
    account_id: str,
    repo: CollectionQueries = Depends(),
):
    collection = repo.get_one(account_id)
    return collection

@router.put('/collections/{account_id}/add/{multiverse_id}', response_model=CollectionOut)
async def add_card_to_collection(
    account_id: str,
    multiverse_id: int,
    repo: CollectionQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    url = f"https://api.scryfall.com/cards/multiverse/{multiverse_id}"
    response = requests.get(url)
    content = json.loads(response.content)

    card_dict = {
    "name": content.get('name'),
    "multiverse_id": content.get('multiverse_ids')[0],
    "card_price": content.get('prices')["usd"],
    }
    
    if content.get("layout") in [
        "modal_dfc", 
        "transform",
    ]:
        card_dict["picture_url"] = content.get("card_faces")[0].get("image_uris").get("normal")
        card_dict["back_picture_url"] = content.get("card_faces")[1].get("image_uris").get("normal")
    else:
        card_dict["picture_url"] = content.get("image_uris").get("normal")

    collection = repo.add_card_to_collection(card=card_dict, account_id=account_id)

    return CollectionOut(**collection)
    
@router.put('/collections/{account_id}/remove_one/{multiverse_id}', response_model=CollectionOut)
def remove_one_card_from_collection(
    account_id: str,
    multiverse_id: int,
    repo: CollectionQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    collection = repo.remove_one_card_copy_from_collection(multiverse_id=multiverse_id, account_id=account_id)
    return collection

@router.put('/collections/{account_id}/remove_all/{multiverse_id}', response_model=CollectionOut)
def remove_all_card_copies_from_collection(
    account_id: str,
    multiverse_id: int,
    repo: CollectionQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    collection = repo.remove_all_card_copies_from_collection(multiverse_id=multiverse_id, account_id=account_id)
    return collection