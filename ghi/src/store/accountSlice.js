import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  full_name: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    clearForm: () => {
      return initialState;
    },
  },
});

export const { clearForm, updateField } = accountSlice.actions;
