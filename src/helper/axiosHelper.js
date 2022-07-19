import axios from "axios";

const rootUrlAPI = "http://localhost:8000/api/v1";
const adminEP = rootUrlAPI + "/admin";
const catEP = rootUrlAPI + "/category";
const productEP = rootUrlAPI + "/products";
const paymentMethodEP = rootUrlAPI + "/payment-method";
const customerEP = rootUrlAPI + "/customers";
const reviewEP = rootUrlAPI + "/reviews";
const orderEP = rootUrlAPI + "/orders";

// ====== admin apis
//@data must be an object
const apiProcessor = async ({ method, url, dataObj, headers }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: dataObj,
      headers,
    });
    return data;
  } catch (error) {
    let message = error.message;
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refresh");
      return { status: "error", message: "Unauthenticated" };
    }

    if (error.response && error.response.data) {
      message = error.response.data.message;
    }

    if (message === "jwt expired!") {
      // call the api to get new refreshJWT and re call the apiProcessor it self

      const accessJWT = await requestNewAccessJWT();

      if (accessJWT) {
        return apiProcessor({
          method,
          url,
          dataObj,
          headers: {
            Authorization: accessJWT,
          },
        });
      }
    }
    return {
      status: "error",
      message,
    };
  }
};
export const requestNewAccessJWT = async () => {
  const { accessJWT } = await apiProcessor({
    method: "get",
    url: adminEP + "/accessjwt",

    headers: {
      Authorization: localStorage.getItem("refreshJWT"),
    },
  });
  sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
};

export const getAdminUser = () => {
  const url = adminEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postUser = (dataObj) => {
  const url = adminEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const loginUser = (dataObj) => {
  const url = adminEP + "/login";
  return apiProcessor({ method: "post", url, dataObj });
};

export const postEmailVerifiation = (dataObj) => {
  const url = adminEP + "/email-verification";
  return apiProcessor({ method: "post", url, dataObj });
};

export const updateAdminUser = (dataObj) => {
  const url = adminEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// request OTP
export const requestPasswordResetOtp = (dataObj) => {
  const url = adminEP + "/otp-request";
  return apiProcessor({ method: "post", url, dataObj });
};
// reset password
export const updateAdminPassword = (dataObj) => {
  const url = adminEP + "/password";
  return apiProcessor({ method: "patch", url, dataObj });
};
// update password
export const updatePassword = (dataObj) => {
  const url = adminEP + "/update-password";
  return apiProcessor({
    method: "patch",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// === category api

export const getCategories = () => {
  const url = catEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postCategories = (dataObj) => {
  const url = catEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deleteCategory = (_id) => {
  const url = catEP;
  return apiProcessor({
    method: "delete",
    url,
    dataObj: { _id },
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updateCategories = (dataObj) => {
  const url = catEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// ======product api

export const getProducts = () => {
  const url = productEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
export const getSingleProducts = (_id) => {
  const url = productEP + "/" + _id;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deleteProducts = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "delete",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updateProducts = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// ##=========payment api===========

export const getPaymentMethods = () => {
  const url = paymentMethodEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
export const postPaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// ===========customer  apis

export const getCustomer = (_id) => {
  const url = _id ? customerEP + "/" + _id : customerEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
export const getReview = (_id) => {
  const url = _id ? reviewEP + "/" + _id : reviewEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
export const getOrder = (_id) => {
  const url = _id ? orderEP + "/" + _id : orderEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
