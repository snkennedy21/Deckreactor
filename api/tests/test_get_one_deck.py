from fastapi.testclient import TestClient
from main import app
from queries.decks import DeckQueries
from routers.accounts import AccountToken
from routers.authenticator import authenticator
from models import AccountOut, DeckOut


client = TestClient(app)


fake_account = AccountOut(
    id="accountID", email="email@email", full_name="name", roles=["roles"]
)

fake_account_token = AccountToken(
    access_token="accesstoken", type="Bearer", account=fake_account
)

fake_deck = DeckOut(
    id="string",
    account_id="acccount",
    name="name",
    description="string",
    cards=["cards"],
)


async def override_get_token():
    return fake_account.dict()


class EmptyDeckRepository:
    def get_one(self, deck_id):
        return fake_deck.dict()


def test_get_one_deck():

    # Arrange
    app.dependency_overrides[DeckQueries] = EmptyDeckRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = override_get_token

    # Act
    response = client.get("/decks/{deck_id}")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == fake_deck
    print(response)
