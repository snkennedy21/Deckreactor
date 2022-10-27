from fastapi import APIRouter, Depends, HTTPException, status
from models import AccountOut, CardIn, CardList, CardOut
from queries.cards import CardQueries
from .authenticator import authenticator
from typing import List

router = APIRouter(tags=["cards"])


@router.post("/cards/", response_model=CardOut)
async def add_card_to_collection(
    card: CardIn,
    repo: CardQueries = Depends(),
):
    card = repo.create(card)
    return card


@router.get("/cards/", response_model=CardList)
async def get_all_cards(repo: CardQueries = Depends()):
    return CardList(cards=repo.get_all())
