import React from "react";
import "./App.css";
import RegistrationPage from "./pages/register-login/RegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/register-login/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerification from "./pages/register-login/EmailVerification";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminProfile from "./pages/admin-profile/AdminProfile";
import Categories from "./pages/categories/Categories";
import Product from "./pages/products/Product";
import NewProduct from "./pages/products/NewProduct";
import EditProduct from "./pages/products/EditProduct";
import PaymentMethod from "./pages/payment-method/PaymentMethod";
import ResetPassword from "./pages/register-login/ResetPassword";
import PrivateRoute from "./components/private-route/PrivateRoute";
import SettingPage from "./components/setting/SettingPage";
import Customer from "./pages/customer/Customer";
import Reviews from "./pages/reviews/Reviews";
import Order from "./pages/order/Order";
import OrderDetails from "./pages/order/OrderDetail";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* private route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/new"
            element={
              <PrivateRoute>
                <NewProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/edit/:_id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <PrivateRoute>
                <PaymentMethod />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <RegistrationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/setting"
            element={
              <PrivateRoute>
                <SettingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <Customer />
              </PrivateRoute>
            }
          />

          <Route
            path="/reviews"
            element={
              <PrivateRoute>
                <Reviews />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/:_id"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
          {/* public routes */}

          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ResetPassword />} />

          <Route path="/admin/verify-email" element={<EmailVerification />} />
          <Route path="#" element={<h1> 404 Page not found</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
