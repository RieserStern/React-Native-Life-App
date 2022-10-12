import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_STATE } from "../constants/redux";

const loginSlice = createSlice({
  name: "login_state",
  initialState: {
    login_action_state: LOGIN_STATE.NONE,
    isLoading: false,
    user: {},
  },
  reducers: {
    setLoginState(state, action) {
      if (action.payload == LOGIN_STATE.REQUEST) {
        state.isLoading = true;
        state.login_action_state = action.payload;
      } else {
        state.isLoading = false;
        state.login_action_state = action.payload;
      }
    },
    setUser(state, action) {
      state.isLoading = false;
      state.login_action_state = LOGIN_STATE.SUCCESS;
      state.user = action.payload;
    },
  },
});

export const { setLoginState, setUser } = loginSlice.actions;
export default loginSlice.reducer;
