import { toast } from "react-toastify";
import {
  deletePaymentMethod,
  getPaymentMethods,
  postPaymentMethod,
  updatePaymentMethod,
} from "../../helper/axiosHelper";
import { toggleModal } from "../../system-state/systemSlice";
import {
  setPaymentMethods,
  setSelectedPaymentMethods,
} from "./PaymentMethodSlice";

export const fetchPaymentMethods = () => async (dispatch) => {
  //call axios to call api
  const response = await getPaymentMethods();

  response.status === "success" && dispatch(setPaymentMethods(response.result));
  //get data and set to seate
};

export const fetchSinglePaymentMethod = (_id) => async (dispatch) => {
  //calll axios to call api
  const response = await getPaymentMethods(_id);

  response.status === "success" &&
    dispatch(setSelectedPaymentMethods(response.result));
  //get data and set to seate
};

export const postPaymentMethodAction = (obj) => async (dispatch) => {
  //calll axios to call api
  const responsePromise = postPaymentMethod(obj);

  toast.promise(responsePromise, {
    pending: "Please wait...",
  });

  const response = await responsePromise;
  toast[response.status](response.message);
  response.status === "success" && dispatch(fetchPaymentMethods());
  //get data and set to seate
};

export const deletePaymentMethodAction = (_id) => async (dispatch) => {
  //calll axios to call api
  const responsePromise = deletePaymentMethod(_id);

  toast.promise(responsePromise, {
    pending: "Please wait...",
  });

  const response = await responsePromise;
  toast[response.status](response.message);
  response.status === "success" && dispatch(fetchPaymentMethods());
  //get data and set to seate
};

export const editPaymentMethodAction = (_id) => async (dispatch) => {
  dispatch(toggleModal());

  //calll axios to call api

  dispatch(fetchSinglePaymentMethod(_id));
};

export const updatePaymentMethodAction = (obj) => async (dispatch) => {
  //calll axios to call api
  const responsePromise = updatePaymentMethod(obj);

  toast.promise(responsePromise, {
    pending: "Please wait...",
  });

  const response = await responsePromise;
  toast[response.status](response.message);
  response.status === "success" &&
    dispatch(fetchPaymentMethods()) &&
    dispatch(toggleModal());
  //get data and set to
};
