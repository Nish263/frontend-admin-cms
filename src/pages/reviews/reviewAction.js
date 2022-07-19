import { getReview } from "../../helper/axiosHelper";
import { setReviews } from "./reviewsSlice";

export const getReviewAction = (_id) => async (dispatch) => {
  const { status, reviews } = await getReview(_id);
  status === "success" && reviews.length && dispatch(setReviews(reviews));
};
