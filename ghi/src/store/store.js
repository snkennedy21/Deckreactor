import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { scryfallApi } from "./RTK_Query/scryfallApi";
import { searchSlice } from "./redux-slices/searchSlice";
import { accountSlice } from "./redux-slices/accountSlice";
import { accountApiSlice } from "./RTK_Query/accountApi";
import { myCardsApi } from "./RTK_Query/myCardsApi";
import { scryfallWebApi } from "./RTK_Query/scryfallWebApi";
import { deckSlice } from "./redux-slices/deckSlice";

export const store = configureStore({
  reducer: {
    [scryfallApi.reducerPath]: scryfallApi.reducer,
    [accountApiSlice.reducerPath]: accountApiSlice.reducer,
    [myCardsApi.reducerPath]: myCardsApi.reducer,
    [searchSlice.name]: searchSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [scryfallWebApi.reducerPath]: scryfallWebApi.reducer,
    [deckSlice.name]: deckSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(scryfallApi.middleware)
      .concat(accountApiSlice.middleware)
      .concat(myCardsApi.middleware)
      .concat(scryfallWebApi.middleware),
});

export const searchActions = searchSlice.actions;
export const deckActions = deckSlice.actions;

setupListeners(store.dispatch);
