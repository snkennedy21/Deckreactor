from fastapi import APIRouter, Depends
# from models import SearchScryfallOut
import requests
import json

router = APIRouter(tags=["scryfall"])

@router.get("/scryfall/{search}")
async def search_scryfall(
    search: str
):
    url = f"https://api.scryfall.com/cards/search?q={search}"
    response = requests.get(url)
    content = json.loads(response.content)

    if content.get("code") == "not_found":
        return {
            "message": "No cards found matching your query."
        }

    output = {"cards": []}
    cards = content.get("data")
    for card in cards:
        if len(card.get("multiverse_ids")) == 0:
            continue # we don't care about tokens, alchemy cards

        if card.get("layout") in ["modal_dfc", "transform"]: # double-faced card
            object = {
                "name": card.get("name"), # "front name // back name"
                "multiverse_id": card.get("multiverse_ids")[0],
                "picture_url": card.get("card_faces")[0].get("image_uris").get("normal"),
                "back": {
                    "picture_url": card.get("card_faces")[1].get("image_uris").get("normal"),
                }
            }
        else: # single-faced card
            object = {
                "name": card.get("name"),
                "multiverse_id": card.get("multiverse_ids")[0],
                "picture_url": card.get("image_uris").get("normal"),
            }

        output["cards"].append(object)
    
    return output