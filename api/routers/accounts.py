from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from .auth import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from models import (
    Account,
    AccountIn,
    AccountOut,
)

class AccountForm(BaseModel):
  username: str
  password: str

class AccountToken(Token):
  account: AccountOut

class HttpError(BaseModel):
  detail: str


router = APIRouter()
 

# This endpoint takes care of getting tokens. We have not learned this yet
@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post('/api/account/', response_model=AccountToken | HttpError)
async def create_account(
  info: AccountIn,
  request: Request,
  response: Response,
  repo: AccountQueries = Depends(),
):

  # This section of the function takes care of basic account creation. It does not deal with authentication. It just makes an account and puts it in the database
  hashed_password = authenticator.hash_password(info.password)   # authenicator.hash_password is a security measure for create password 
  try:
    account = repo.create(info, hashed_password)  # calls the function in querries.accounts in order to create a new account. account has an id and a list of roles
  except DuplicateAccountError:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Cannot Create An Account With Those Credentials"
    )
  
  # This is stuff we have not learned yet. This is the section of the function that takes care of authentication
  form = AccountForm(username=info.email, password=info.password)      # generates a form for the submitted account details to create a username and password
  token = await authenticator.login(response, request, form, repo)     # generates a token for the user when they create an account
  return AccountToken(account=account, **token.dict())    # returns an AccountToken based on the token and the account that was created in the previous section of the function

@router.get('/api/accounts/')
async def get_accounts():
  pass
