from fastapi.testclient import TestClient
from main import app
from queries.decks import DeckQueries
from routers.accounts import get_token

client = TestClient(app)

async def override_get_token():
    return {
        "access_token": "string",
        "token_type": "Bearer",
        "account": {
            "id": "string",
            "email": "string",
            "full_name": "string",
            "roles": [
                "string"
            ]
        }
  }
    
app.dependency_overrides[get_token] = override_get_token

class EmptyDeckRepository:
    def get_all(self):
        return []

def test_get_all_decks():

    # Arrange
    app.dependency_overrides[DeckQueries] = EmptyDeckRepository
    app.dependency_overrides[get_token] = override_get_token
    

    # Act
    response = client.get("/decks/")

    # Clean up
    app.dependency_overrides = {}
    
    # Assert
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}


