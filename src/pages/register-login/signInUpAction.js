import {
  postUser,
  loginUser,
  getAdminUser,
  requestNewAccessJWT,
} from "../../helper/axiosHelper.js";
import { isPending, responseResolved } from "./signUpSlice.js";
import { toast } from "react-toastify";
import { setUser } from "../admin-profile/AdminProfileSlice.js";

export const postUserAction = (user) => async (dispatch) => {
  dispatch(isPending());

  // call axio helper to call api
  const promiseData = postUser(user);
  toast.promise(promiseData, {
    pending: "Please wait",
    // success: 'Promise resolved 👌',
    // error: 'Promise rejected 🤯'
  });
  const data = await promiseData;
  toast[data.status](data.message);

  dispatch(responseResolved(data));
};

export const postLoginAction = (user) => async (dispatch) => {
  dispatch(isPending());
  const promiseData = loginUser(user);
  toast.promise(promiseData, {
    pending: "Please wait",
  });
  const data = await promiseData;
  console.log(data);
  if (data.status === "success") {
    sessionStorage.setItem("accessJWT", data.accessJWT);
    localStorage.setItem("refreshJWT", data.refreshJWT);
    dispatch(setUser(data.user));
  }

  data.status === "error" && toast[data.status](data.message);
  dispatch(responseResolved(data));
};

const fetchUser = (accessJWT) => async (dispatch) => {
  const response = await getAdminUser();
  response.status === "success" && dispatch(setUser(response.user));
};

export const authoAdminLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  //if accessJWT  exist, featch user and mount user in our state
  //else
  // if refreshJWT exist, fect new accessJWT and fetch the user
  if (accessJWT) {
    dispatch(fetchUser());
    return;
  } else if (refreshJWT) {
    const token = await requestNewAccessJWT();
    token ? dispatch(fetchUser()) : dispatch(adminLogout());
  } else {
    dispatch(adminLogout());
  }
};

export const adminLogout = () => (dispatch) => {
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
  dispatch(setUser({}));
};
