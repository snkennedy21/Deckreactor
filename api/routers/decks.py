from fastapi import APIRouter, Depends, HTTPException, status
from models import DeckOut, DeckIn, DeckList, AccountOut, DeckDetailsIn
from queries.decks import DeckQueries
from .auth import authenticator
from typing import List

router = APIRouter()


@router.post('/decks/', response_model=DeckOut)
async def create_deck(
    deck: DeckDetailsIn,
    repo: DeckQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = AccountOut(**account_data)
    user_deck = DeckIn(account_id=account.id, name=deck.name, description=deck.description)
    user_deck = repo.create(user_deck)
    return user_deck

# Get All Decks
@router.get('/decks/', response_model=DeckList)
async def get_all_decks(
    repo: DeckQueries = Depends(),
):
    return DeckList(decks=repo.get_all())

# Get One Deck
@router.get('/decks/{deck_id}', response_model=DeckOut)
async def get_one_deck(
  deck_id: str,
  repo: DeckQueries = Depends(),
):
  deck = repo.get_one(deck_id)
  print(deck)
  return deck
  
  

# Delete One Deck
@router.delete('/decks/{deck_id}', response_model=bool)
async def delete_deck(
  deck_id: str,
  repo: DeckQueries = Depends(),
):
  repo.delete_deck(deck_id)
  return True
  





