import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { scryfallApi } from "./scryfallApi";
import { searchSlice } from "./searchSlice";
import { accountSlice } from "./accountSlice";
import { accountApiSlice } from "./accountApi";
import { myCardsApi } from "./myCardsApi";
import { scryfallWebApi } from "./scryfallWebApi";
import { deckSlice } from "./deckSlice";

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
