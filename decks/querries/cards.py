from pydantic import BaseModel
from querries.pool import pool
from typing import List, Union


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
        return self.card_in_to_out(id, card)
  
  def get_all(self) -> Union[Error, List[CardOut]]:
    try:
      with pool.connection() as conn:
        with conn.cursor() as db:
          result = db.execute(
            '''
            SELECT id, name, multiverse_id
            FROM cards
            ORDER BY name
            '''
          )
          return [
            self.record_to_card_out(record)
            for record in result
          ]

    except Exception as e:
      print(e)
      return {"message": "Could not get all cards"}
  
  def update(self, card_id: int, card: CardIn) -> Union[CardOut, Error]:
    try:
      with pool.connection() as conn:
        with conn.cursor() as db:
          result = db.execute(
            '''
            UPDATE cards
            SET name = %s
              , multiverse_id = %s
            WHERE id = %s
            ''',
            [
              card.name,
              card.multiverse_id,
              card_id
            ]
          )
          return self.card_in_to_out(card_id, card)
    except Exception as e:
      print(e)
      return {"message": "Could not get all cards"}

  def delete(self, card_id: int) -> bool:
    try:
      with pool.connection() as conn:
        with conn.cursor() as db:
          db.execute(
            '''
            DELETE FROM cards
            WHERE id = %s
            ''',
            [card_id]
          )
          return True
    except Exception as e:
      print(e)
      return False
    
  def get_one(self, card_id: int) -> Union[CardOut, Error]:
    try:
      with pool.connection() as conn:
        with conn.cursor() as db:
          result = db.execute(
            '''
            SELECT id
              , name
              , multiverse_id
            FROM cards
            WHERE id = %s
            ''',
            [card_id]
          )
          record = result.fetchone()
          return self.record_to_card_out(record)
    except Exception as e:
      print(e)
      return {"message": "could not get a card"}
    

  def card_in_to_out(self, id: int, card: CardIn):
    old_data = card.dict()
    return CardOut(id=id, **old_data)
  
  def record_to_card_out(self, record):
    return CardOut(
      id=record[0],
      name=record[1],
      multiverse_id=record[2]
    )