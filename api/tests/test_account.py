from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries

client = TestClient(app)

class EmptyAccountRepository:
    def get_all(self):
        return []

def test_get_all_accounts():

    # Arrange
    app.dependency_overrides[AccountQueries] = EmptyAccountRepository

    # Act
    response = client.get("/api/accounts/")

    # Clean up
    app.dependency_overrides = {}
    
    # Assert
    assert response.status_code == 200
    assert response.json() == []

# class CreateAccountQueries:
#     def create(self, info, hashed_password):
#         result = {
#             "id": 123,
#             "email": "test@test.com",
#             "password": "password",
#             "full_name": "Test event",
#            }
#         result.update(info)
#         return result

# def test_create_account():

#     # Arrange
#     app.dependency_overrides[AccountQueries] = CreateAccountQueries
#     json = {
#         "email": "test@test.com",
#         "password": "password",
#         "full_name": "Test event",
#     }

#     expected = {
#         "access_token": "string",
#         "token_type": "Bearer",
#         "account": {
#             "id": "string",
#             "email": "email@email.com",
#             "full_name": "name",
#             "roles": [
#                 "role",
#             ]

#         }

#          }

#     # Act 
#     response = client.post("/api/account/", json=json)

#     # Clean up
#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == expected