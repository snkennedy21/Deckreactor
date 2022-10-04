from pydantic import BaseModel
from querries.pool import pool


class CardIn(BaseModel):
  name: str
  multiverse_id: int



class CardRepository:
  def create(self, card: CardIn):

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
        print(result)

        # Return new data
