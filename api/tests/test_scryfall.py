from fastapi.testclient import TestClient
from main import app


client = TestClient(app)


class EmptyScryfallRepository:
    def get_card(self):
        return {}


def test_get_card_from_scryfall():
    # Arrange
    app.dependency_overrides = EmptyScryfallRepository

    # Act
    response = client.get("scryfall/{nocardsexistmatchingyourquery}")

    # Clean up
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"message": "No cards were found matching your query."}
