from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, cards, decks


app = FastAPI()

origins = ['https://localhost:3000']
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
