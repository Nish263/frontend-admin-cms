import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethods: [],
  selectedPaymentMethod: {},
};
const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setPaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    },

    setSelectedPaymentMethods: (state, { payload = {} }) => {
      state.selectedPaymentMethod = payload;
    },
  },
});

const { reducer, actions } = paymentMethodSlice;
export const { setPaymentMethods, setSelectedPaymentMethod } = actions;
export default reducer;
