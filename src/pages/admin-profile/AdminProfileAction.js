import { toast } from "react-toastify";

import {
  requestPasswordResetOtp,
  updateAdminPassword,
  updateAdminUser,
  updatePassword,
} from "../../helper/axiosHelper";
import {
  setIsLoading,
  setPassResetResponse,
  setUser,
  setPassResettingEmail,
} from "./AdminProfileSlice";

export const updateAdminProfileAction = (obj) => async (dispatch) => {
  const promiseResponse = updateAdminUser(obj);
  toast.promise(promiseResponse, { pending: "Please wait" });

  const { status, message, user } = await promiseResponse;
  toast[status](message);
  status === "success" && dispatch(setUser(user));
};

export const requestPasswordResetOTPAction = (obj) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await requestPasswordResetOtp(obj);
  dispatch(setPassResettingEmail(obj.email));
  dispatch(setPassResetResponse(response));
};
export const resetPassAction = (obj) => async (dispatch) => {
  const responsePromise = updateAdminPassword(obj);
  toast.promise(responsePromise, {
    pending: "please wait",
  });
  const { status, message } = await responsePromise;
  toast[status](message);
};
export const updatePassAction = (obj) => async (dispatch) => {
  const responsePromise = updatePassword(obj);
  toast.promise(responsePromise, {
    pending: "please wait",
  });
  const { status, message } = await responsePromise;
  toast[status](message);
};
