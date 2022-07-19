import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "../../components/login-form /LoginForm";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { authoAdminLogin } from "./signInUpAction";

const LoginPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.admin);

  useEffect(() => {
    !user._id && dispatch(authoAdminLogin());
  }, [user]);
  return (
    <DefaultLayout>
      <LoginForm />
    </DefaultLayout>
  );
};

export default LoginPage;
