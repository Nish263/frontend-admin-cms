import {
  deleteProducts,
  getProducts,
  getSingleProducts,
  postProduct,
  updateProducts,
} from "../../helper/axiosHelper";
import { setSelectedProducts, setProducts } from "./productSlice";
import { toast } from "react-toastify";

// import { toast } from "toastify";

export const fetchProductsAction = () => async (dispatch) => {
  const { status, products } = await getProducts();
  status === "success" && products.length && dispatch(setProducts(products));
};

export const fetchSingleProductsAction = (_id) => async (dispatch) => {
  const { status, products } = await getSingleProducts(_id);
  status === "success" && dispatch(setSelectedProducts(products));
};

export const postProductAction = (obj) => async (dispatch) => {
  const response = postProduct(obj);
  toast.promise(response, {
    pending: "Please wait...",
  });
  const { status, message } = await response;
  toast[status](message);
  status === "success" && dispatch(fetchProductsAction());
};

export const deleteProductAction = (ids) => async (dispatch) => {
  const response = deleteProducts(ids);
  toast.promise(response, {
    pending: "Please wait...",
  });
  const { status, message } = await response;
  toast[status](message);
  status === "success" && dispatch(fetchProductsAction());
};

export const updateProductAction = (obj) => async (dispatch) => {
  const response = await updateProducts(obj);
  response.status === "success" && dispatch(setSelectedProducts(response));
  // toast.promise(response, {
  //   pending: "Please wait...",
  // });
  // const { status, message, result } = await response;
  // // toast[status](message);
  // status === "success" && dispatch(setSelectedProducts(result));
};
