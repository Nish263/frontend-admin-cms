import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  passResetResponse: {},
  isLoading: false,
  passResettingEmail: "",
  showForm: "otp",
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setPassResetResponse: (state, { payload }) => {
      state.passResetResponse = payload;
      state.isLoading = false;
      state.showForm = payload.status === "success" ? "password" : "otp";
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setPassResettingEmail: (state, { payload }) => {
      state.passResettingEmail = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const {
  setUser,
  setPassResetResponse,
  setIsLoading,
  setPassResettingEmail,
} = actions;
export default reducer;
