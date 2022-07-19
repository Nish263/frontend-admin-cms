import {
  getCategories,
  postCategories,
  deleteCategory,
  updateCategories,
} from "../../helper/axiosHelper";
import { setCategories } from "./categorySlice";
import { toast } from "react-toastify";

export const fetchCategoriesAction = () => async (dispatch) => {
  //call axios for api call

  const response = await getCategories();
  response.status === "success" && dispatch(setCategories(response.result));
};

export const postCategoryAction = (catObj) => async (dispatch) => {
  const responsePromise = postCategories(catObj);
  toast.promise(responsePromise, {
    pending: "Please wait...",
  });

  const result = await responsePromise;

  toast[result.status](result.message);

  result.status === "success" && dispatch(fetchCategoriesAction());
};

export const deleteCategoryAction = (_id) => async (dispatch) => {
  const responsePromise = deleteCategory(_id);
  toast.promise(responsePromise, {
    pending: "Please wait...",
  });

  const result = await responsePromise;

  toast[result.status](result.message);

  result.status === "success" && dispatch(fetchCategoriesAction());
};

export const updateCategoryAction = (catObj) => async (dispatch) => {
  const responsePromise = updateCategories(catObj);
  toast.promise(responsePromise, {
    pending: "Please wait...",
  });

  const result = await responsePromise;

  toast[result.status](result.message);

  result.status === "success" && dispatch(fetchCategoriesAction());
};
