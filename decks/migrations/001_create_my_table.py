steps = [
  [
    '''
    CREATE TABLE cards (
      id SERIAL PRIMARY KEY NOT NULL,
      multiverse_id INTEGER NOT NULL,
      name VARCHAR(1000) NOT NULL
    );
    ''',
    '''
    DROP TABLE cards
    '''
  ]
]