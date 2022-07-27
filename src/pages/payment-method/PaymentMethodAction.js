import { toast } from "react-toastify";
import {
  deletePaymentMethod,
  getPaymentMethods,
  postPaymentMethod,
} from "../../helper/axiosHelper";
import { setPaymentMethods } from "./PaymentMethodSlice";

export const fetchPaymentMethods = () => async (dispatch) => {
  // call axios to cal api
  const response = await getPaymentMethods();
  console.log(response);
  response.status === "success" && dispatch(setPaymentMethods(response.result));
  //   get data to set to state
};
export const postPaymentMethodAction = (obj) => async (dispatch) => {
  // call axios to cal api
  const responsePromise = postPaymentMethod(obj);

  toast.promise(responsePromise, {
    pending: "Please wait",
  });
  const response = await responsePromise;
  toast[response.status](response.message);

  response.status === "success" && dispatch(fetchPaymentMethods());
  //   get data to set to state
};
export const deletePaymentMethodAction = (_id) => async (dispatch) => {
  // call axios to cal api
  const responsePromise = deletePaymentMethod(_id);

  toast.promise(responsePromise, {
    pending: "Please wait",
  });
  const response = await responsePromise;
  toast[response.status](response.message);

  response.status === "success" && dispatch(fetchPaymentMethods());
  //   get data to set to state
};
