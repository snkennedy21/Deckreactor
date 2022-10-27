from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from .authenticator import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from queries.collections import CollectionQueries
from models import (
    Account,
    AccountIn,
    AccountUpdateIn,
    AccountOut,
    CollectionIn,
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter(tags=["accounts"])


# This endpoint takes care of getting tokens. We have not learned this yet
@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        token_data = {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
        return AccountToken(**token_data)


@router.put(
    "/api/account/{account_id}",
    response_model=AccountToken | HttpError,
)
async def update_account(
    account_id: str,
    info: AccountUpdateIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    if info.password is not None:
        hashed_password = authenticator.hash_password(info.password)
    else:
        hashed_password = None

    try:
        # if info.email in [document.email for document in repo.get_all()]:
        #   raise HTTPException(
        #   status_code=status.HTTP_400_BAD_REQUEST,
        #   detail="Account with that email already exists"
        #   )
        account = repo.update(account_id, info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot Create An Account With Those Credentials",
        )

    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.post("/api/account/", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
    collection: CollectionQueries = Depends(),
):

    hashed_password = authenticator.hash_password(
        info.password
    )
    try:
        account = repo.create(info, hashed_password)
        collection_info = CollectionIn(account_id=account.dict()["id"])
        collection.create(collection_info)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot Create An Account With Those Credentials",
        )

    form = AccountForm(username=info.email, password=info.password)

    token = await authenticator.login(
        response, request, form, repo
        )
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts/", response_model=list[AccountOut])
async def get_accounts(repo: AccountQueries = Depends()):
    return repo.get_all()


@router.delete("/api/accounts/{account_id}", response_model=bool)
async def delete_account(
    account_id: str,
    repo: AccountQueries = Depends(),
):
    repo.delete(account_id)
    return True
