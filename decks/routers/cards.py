from fastapi import APIRouter, Depends, Response, status
from querries.cards import CardIn, CardRepository, CardOut, Error
from typing import Union, List

router = APIRouter()


@router.post("/cards", response_model=Union[CardOut, Error])
def create_card(
  card: CardIn, 
  response: Response, 
  repo: CardRepository = Depends()
  ):
  response.status_code = 400
  return repo.create(card)


@router.get("/cards", response_model=Union[List[CardOut], Error])
def get_all_cards(repo: CardRepository = Depends()):
  return repo.get_all()


@router.put('/cards/{card_id}', response_model=Union[CardOut, Error])
def update_card(
  card_id: int,
  card: CardIn,
  repo: CardRepository = Depends()
) -> Union[Error, CardOut]:
  return repo.update(card_id, card)

@router.delete('/cards/{card_id}', response_model=bool)
def delete_card(
  card_id: int,
  repo: CardRepository = Depends(),
) -> bool:
  return repo.delete(card_id)

@router.get('/cards/{card_id}', response_model=Union[CardOut, Error])
def get_one_card(
  card_id: int,
  repo: CardRepository = Depends(),
) -> CardOut:
  return repo.get_one(card_id)