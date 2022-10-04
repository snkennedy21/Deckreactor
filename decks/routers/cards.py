from fastapi import APIRouter, Depends
from querries.cards import CardIn, CardRepository

router = APIRouter()


@router.post("/cards")
def create_card(card: CardIn, repo: CardRepository = Depends()):
  repo.create(card)
  
  return card