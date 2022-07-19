import { getCustomer } from "../../helper/axiosHelper";
import { setCustomers } from "./customerSlice";

export const getCustomersAction = (_id) => async (dispatch) => {
  const { status, customers } = await getCustomer(_id);
  status === "success" && customers.length && dispatch(setCustomers(customers));
};
