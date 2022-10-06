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
  hashed_password = authenticator.hash_password(info.password) 
  try:
    account = repo.create(info, hashed_password)
  except DuplicateAccountError:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="Cannot Create An Account With Those Credentials"
    )
  
  form = AccountForm(username=info.email, password=info.password)
  token = await authenticator.login(response, request, form, repo)
  return AccountToken(account=account, **token.dict())


