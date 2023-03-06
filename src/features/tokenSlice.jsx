import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    userToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { userToken } = tokenSlice.actions;

export default tokenSlice.reducer;
