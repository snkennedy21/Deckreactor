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
        object = {}

        # assemble card object

        output["cards"].append(object)
    
    return output