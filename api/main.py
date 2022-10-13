from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, cards, decks, scryfall
from routers.authenticator import authenticator


app = FastAPI()

origins = ['https://localhost:3000', 'http://localhost:3000']
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials = True,
  allow_methods=["*"],
  allow_headers=["*"]
)

app.include_router(accounts.router)
app.include_router(cards.router)
app.include_router(decks.router)
app.include_router(authenticator.router)
app.include_router(scryfall.router)