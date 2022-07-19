import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};
const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, { payload }) => {
      state.customers = payload;
    },
  },
});

const { reducer, actions } = customerSlice;
export const { setCustomers } = actions;
export default reducer;
