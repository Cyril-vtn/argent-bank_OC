import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      if (action.payload.userInfo) {
        state.userInfo = action.payload.userInfo;
      }
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
