import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { scryfallApi } from "./scryfallApi";
import { searchSlice } from "./searchSlice";
// import { myDecksSlice } from "./myDecksSlice";
import { accountSlice } from "./accountSlice";
import { accountApiSlice } from "./accountApi";
import { myDecksApi } from "./myDecksApi";

export const store = configureStore({
  reducer: {
    [scryfallApi.reducerPath]: scryfallApi.reducer,
    [accountApiSlice.reducerPath]: accountApiSlice.reducer,
    // [myDecksSlice.name]: myDecksSlice.reducer,
    [myDecksApi.reducerPath]: myDecksApi.reducer,
    [searchSlice.name]: searchSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(scryfallApi.middleware)
      .concat(accountApiSlice.middleware)
      .concat(myDecksApi.middleware)
});

export const searchActions = searchSlice.actions;

setupListeners(store.dispatch);
