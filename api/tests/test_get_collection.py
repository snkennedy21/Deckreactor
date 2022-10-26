from fastapi.testclient import TestClient
from main import app
from queries.collections import CollectionQueries
from routers.accounts import AccountToken
from routers.authenticator import authenticator
from models import AccountOut, CollectionOut

client = TestClient(app)

fake_account = AccountOut(id = "accountID", email = "email@email", full_name = "name", roles = ["roles"])

fake_account_token = AccountToken(access_token = "accesstoken", type = "Bearer", account = fake_account)

fake_collection_list = CollectionOut(cards = [], account_id = "accountID")



async def override_get_token():
    return fake_account.dict()


class EmptyCollectionRepository:
    def get_one(self, account_id):
        return {"cards": [], "account_id": "accountID"}
    
    
   
    

def test_get_collection():

    #Arrange
    app.dependency_overrides[CollectionQueries] = EmptyCollectionRepository
    app.dependency_overrides[authenticator.try_get_current_account_data] = override_get_token

    #Act
    response = client.get("/collections/")

    #Clean up
    app.dependency_overrides = {}

    #Assert
    assert response.status_code == 200
    assert response.json() == fake_collection_list






