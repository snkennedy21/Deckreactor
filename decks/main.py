from fastapi import FastAPI
from routers import cards


app = FastAPI()
app.include_router(cards.router)