from fastapi import APIRouter

# from models import SearchScryfallOut
import requests
import json

router = APIRouter(tags=["scryfall"])


@router.get("/scryfall/{search}")
async def search_scryfall(search: str):
    output = {"cards": []}
    url = f"https://api.scryfall.com/cards/search?q={search}"
    response = requests.get(url)
    content = json.loads(response.content)
    error_msg = {"message": "No cards were found matching your query."}
    if content.get("code") == "not_found" or content.get("total_cards") == 0:
        return error_msg
    if content.get("code") == "bad_request":
        return {
            "message": " ".join(content["warnings"])
            + " "
            + content["details"]
            }
            
    def collect(cards):  # appends cards in input list to output["cards"]
        for card in cards:
            if (
                len(card.get("multiverse_ids")) == 0
                or card.get("layout") == "art_series"
            ):
                continue

            if card.get("layout") in [
                "modal_dfc",
                "transform",
            ]:  # double-faced card types
                object = {
                    "name": card.get("name"),  # "front name // back name"
                    "multiverse_id": card.get("multiverse_ids")[0],
                    "picture_url": card.get("card_faces")[0]
                    .get("image_uris")
                    .get("normal"),
                    "back_picture_url": card.get("card_faces")[1]
                    .get("image_uris")
                    .get("normal"),
                }
            else:  # single-faced card
                object = {
                    "name": card.get("name"),
                    "multiverse_id": card.get("multiverse_ids")[0],
                    "picture_url": card.get("image_uris").get("normal"),
                }

            output["cards"].append(object)

    collect(content["data"])

    while content["has_more"]:  # collect cards from rest of paginated results
        url = content["next_page"]
        response = requests.get(url)
        content = json.loads(response.content)
        collect(content["data"])

    return error_msg if len(output["cards"]) == 0 else output
