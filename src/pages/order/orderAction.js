import { getOrder } from "../../helper/axiosHelper";
import { setOrders } from "./orderSlice";

export const getOrderAction = (_id) => async (dispatch) => {
  const { status, orders } = await getOrder(_id);
  status === "success" && orders.length && dispatch(setOrders(orders));
};
