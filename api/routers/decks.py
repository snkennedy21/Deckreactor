from fastapi import APIRouter, Depends, HTTPException, status
from models import DeckOut, DeckIn, Deck, DeckList
from queries.decks import DeckQueries
from .auth import authenticator
from typing import List

router = APIRouter()


@router.post('/decks/', response_model=DeckOut)
async def create_deck(
  deck: DeckIn,
  repo: DeckQueries = Depends(),
):
    deck = repo.create(deck)
    return deck

# Get All Decks
@router.get('/decks/', response_model=DeckList)
async def get_all_decks():
    pass

# Get One Deck
@router.get('/decks/', response_model=DeckOut)
async def get_one_deck():
    pass






