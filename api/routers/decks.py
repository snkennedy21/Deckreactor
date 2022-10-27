from fastapi import APIRouter, Depends
from models import DeckOut, DeckIn, DeckList, AccountOut, DeckDetailsIn
from queries.decks import DeckQueries
from .authenticator import authenticator
import requests
import json

router = APIRouter(tags=["decks"])


@router.post("/decks/", response_model=DeckOut)
async def create_deck(
    deck: DeckDetailsIn,
    repo: DeckQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    print("hello")
    account = AccountOut(**account_data)
    user_deck = DeckIn(
        account_id=account.id, name=deck.name, description=deck.description
    )
    user_deck = repo.create(user_deck)
    return user_deck


# Get All My Decks
@router.get("/decks/", response_model=DeckList)
async def get_all_my_decks(
    repo: DeckQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    account_id = account.id
    return DeckList(decks=repo.get_all(account_id))


# Get One Deck
@router.get("/decks/{deck_id}", response_model=DeckOut)
async def get_one_deck(
    deck_id: str,
    repo: DeckQueries = Depends(),
):
    deck = repo.get_one(deck_id)
    print(deck)
    return deck


# Delete One Deck
@router.delete("/decks/{deck_id}", response_model=bool)
async def delete_deck(
    deck_id: str,
    repo: DeckQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    repo.delete_deck(deck_id)
    return True


# Update Deck
@router.put("/decks/{deck_id}", response_model=DeckOut)
async def update_deck(
    deck_id: str,
    deck: DeckIn,
    repo: DeckQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    account_id = account.id
    updated_deck = DeckIn(
        name=deck.name, description=deck.description, account_id=account_id
    )
    updated_deck = repo.update_deck(deck=updated_deck, deck_id=deck_id)
    return updated_deck


@router.put("/decks/{deck_id}/add/{multiverse_id}", response_model=DeckOut)
async def add_card_to_deck(
    deck_id: str,
    multiverse_id: int,
    repo: DeckQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    url = f"https://api.scryfall.com/cards/multiverse/{multiverse_id}"
    response = requests.get(url)
    content = json.loads(response.content)

    card_dict = {
        "name": content.get("name"),
        "multiverse_id": content.get("multiverse_ids")[0],
        "mana": content.get('mana_cost'),
        "card_type": content.get("type_line"),
        "cmc": content.get("cmc"),
        "formats": [
            legality
            for legality in content.get("legalities")
            if content.get("legalities")[legality] == "legal"
        ],
    }

    if content.get("layout") in [
        "modal_dfc",
        "transform",
    ]:
        card_dict["picture_url"] = (
            content.get("card_faces")[0].get("image_uris").get("normal")
        )
        card_dict["mana"] = content.get("card_faces")[0].get("mana_cost")
    else:
        card_dict["picture_url"] = content.get("image_uris").get("normal")
        card_dict["mana"] = content.get("mana_cost")

    deck = repo.add_card_to_deck(card=card_dict, deck_id=deck_id)

    return deck


# remove one card of specified multiverse_id from deck
@router.put(
    "/decks/{deck_id}/remove_one/{multiverse_id}",
    response_model=DeckOut,
)
def remove_one_card_copy_from_deck(
    deck_id: str,
    multiverse_id: int,
    repo: DeckQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = repo.remove_one_card_copy_from_deck(
        multiverse_id=multiverse_id, deck_id=deck_id
    )
    return deck


# remove all cards of specified multiverse_id from deck
@router.put(
    "/decks/{deck_id}/remove_all/{multiverse_id}",
    response_model=DeckOut,
)
def remove_all_card_copies_from_deck(
    deck_id: str,
    multiverse_id: int,
    repo: DeckQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = repo.remove_all_card_copies_from_deck(
        multiverse_id=multiverse_id, deck_id=deck_id
    )
    return deck
