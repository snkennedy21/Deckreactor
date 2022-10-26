import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
};

export const deckSlice = createSlice({
  name: "deck",
  initialState: initialState,
  reducers: {
    updateId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { updateId } = deckSlice.actions;
