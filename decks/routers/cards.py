from fastapi import APIRouter, Depends, Response, status
from querries.cards import CardIn, CardRepository, CardOut, Error
from typing import Union

router = APIRouter()


@router.post("/cards", response_model=Union[CardOut, Error])
def create_card(
  card: CardIn, 
  response: Response, 
  repo: CardRepository = Depends()
  ):
  response.status_code = 400
  return repo.create(card)
