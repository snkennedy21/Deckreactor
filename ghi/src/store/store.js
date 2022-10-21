import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { scryfallApi } from "./scryfallApi";
import { searchSlice } from "./searchSlice";
import { myDecksSlice } from "./myDecksSlice";
import { accountSlice } from "./accountSlice";
import { accountApiSlice } from "./accountApi";

export const store = configureStore({
  reducer: {
    [scryfallApi.reducerPath]: scryfallApi.reducer,
    [accountApiSlice.reducerPath]: accountApiSlice.reducer,
    search: searchSlice.reducer,
    [myDecksSlice.name]: myDecksSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(scryfallApi.middleware),
});

export const searchActions = searchSlice.actions;

setupListeners(store.dispatch);
