from .client import Queries
from models import Account, AccountIn
from pymongo.errors import DuplicateKeyError

class DuplicateAccountError(ValueError):
  pass



class AccountQueries(Queries): # Queries is a class that handles creation of a database and the collection in the database
  DB_NAME = "deck_reactor"  # Specifies which database we're querrying or inserting data into
  COLLECTION = "accounts"  # specifies which collection we're querrying or inserting data into

  def get(self, email: str) -> Account:
    props = self.collection.find_one({"email": email})  # Query the collectio in the database and look for an email that matches the email passed into the function
    if not props: 
      return None
    props["id"] = str(props["_id"]) # 
    return Account(**props)

  def create(self, info: AccountIn, hashed_password: str, roles=["patron"]) -> Account:
    props = info.dict()  # Takes the AccountIn data passed in by use and transforms it into a dictionary called props
    props["password"] = hashed_password  # Replaces the unhashed password that's currently in the dictionary witht he hashed password that was created in routers.accounts.py
    props["roles"] = roles  #  Sets the type of user that is being created. In this case it is a patron, which will limit the users access in the website
    try:
      self.collection.insert_one(props)  # adds the user with the information in the props dictionary to the "accounts" collectin in the database
    except DuplicateKeyError:
      raise DuplicateAccountError()
    props["id"] = str(props["_id"])  # takes the 
    return Account(**props)  # returns the Account