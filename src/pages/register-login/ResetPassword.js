import React from "react";
import { useSelector } from "react-redux";

import { ResetPasswordForm } from "../../components/password-reset/ResetPasswordForm";
import { ResetPasswordOtpForm } from "../../components/password-reset/ResetPasswordOtpForm";
import { DefaultLayout } from "../layouts/DefaultLayout";

const ResetPassword = () => {
  const { showForm } = useSelector((state) => state.admin);

  const form = {
    otp: <ResetPasswordForm />,
    password: <ResetPasswordOtpForm />,
  };
  return <DefaultLayout>{form[showForm]}</DefaultLayout>;
};

export default ResetPassword;
