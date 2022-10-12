import { createSlice } from "@reduxjs/toolkit";
import { AUTH_STATE } from "../constants/redux";

const appSlice = createSlice({
  name: "auth_state",
  initialState: {
    auth_state: AUTH_STATE.UNCHECK,
  },
  reducers: {
    setAuthState(state, action) {
      console.log(action.payload);
      state.auth_state = action.payload;
    },
  },
});

export const { setAuthState } = appSlice.actions;
export default appSlice.reducer;
