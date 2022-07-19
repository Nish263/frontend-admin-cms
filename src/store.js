import { configureStore } from "@reduxjs/toolkit";
import SignInUpReducer from "./pages/register-login/signUpSlice.js";
import systemReducer from "./system-state/systemSlice.js";
import adminReducer from "./pages/admin-profile/AdminProfileSlice";
import categoryReducer from "./pages/categories/categorySlice";
import productReducer from "./pages/products/productSlice";
import paymentMethodReducer from "./pages/payment-method/PaymentMethodSlice";
import customerReducer from "./pages/customer/customerSlice";
import reviewReducer from "./pages/reviews/reviewsSlice";
import orderReducer from "./pages/order/orderSlice";

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    system: systemReducer,
    admin: adminReducer,
    category: categoryReducer,
    products: productReducer,
    paymentMethod: paymentMethodReducer,
    customers: customerReducer,
    reviews: reviewReducer,
    orders: orderReducer,
  },
});

export default store;
