from pydantic import BaseModel
from querries.pool import pool


class Error(BaseModel):
  message: str

class CardIn(BaseModel):
  name: str
  multiverse_id: int

class CardOut(BaseModel):
  id: int
  name: str
  multiverse_id: int


class CardRepository:
  def create(self, card: CardIn) -> CardOut:

    # Connect the database
    with pool.connection() as conn:

      # Get a cursor (something to run SQL with)
      with conn.cursor() as db:

        # Run our INSERT statement
        result = db.execute(
          '''
          INSERT INTO cards
            (multiverse_id, name)
          VALUES
            (%s, %s)
          RETURNING id;
          ''',
          [card.multiverse_id, card.name]
        )
        id = result.fetchone()[0]

        # Return new data
        old_data = card.dict()
        return CardOut(id=id, **old_data)
