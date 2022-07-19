import React from "react";
import { RegisterForm } from "../../components/register-form/RegisterForm";
import { DefaultLayout } from "../layouts/DefaultLayout";

const RegistrationPage = () => {
  return (
    <DefaultLayout>
      <RegisterForm />
    </DefaultLayout>
  );
};

export default RegistrationPage;
