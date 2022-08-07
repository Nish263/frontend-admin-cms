import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethods: [],
  selectedPaymentMethods: {},
};
const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setPaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    },

    setSelectedPaymentMethods: (state, { payload = {} }) => {
      state.selectedPaymentMethods = payload;
    },
  },
});

const { reducer, actions } = paymentMethodSlice;
export const { setPaymentMethods, setSelectedPaymentMethods } = actions;
export default reducer;
