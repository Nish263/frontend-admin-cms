import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { CustomInput } from "../../components/custom-input/CustomInput";
import AdminLayout from "../layouts/AdminLayout";
import {
  updateAdminProfileAction,
  updatePassAction,
} from "./AdminProfileAction";

const passInitialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const { user } = useSelector((state) => state.admin);
  const [passUpdateForm, setPassUpdateForm] = useState(passInitialState);
  const [error, setError] = useState("");
  const [disableBtn, setDisableBtn] = useState("true");

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { createdAt, status, emailValidationCode, updatedAt, __v, ...rest } =
      form;
    dispatch(updateAdminProfileAction(rest));
  };

  const inputField = [
    {
      label: " First Name",
      name: "fname",
      type: "text",
      value: form.fname,
      required: true,
    },
    {
      label: " Last Name",
      name: "lname",
      type: "text",
      value: form.lname,
      required: true,
    },
    {
      label: " Email",
      name: "email",
      type: "text",
      value: form.email,
      required: true,
      disabled: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      value: form.phone,
    },

    {
      label: " DOB",
      name: "dob",
      type: "date",
      value: form.dob ? form.dob.substr(0, 10) : undefined,
    },

    {
      label: " Address",
      name: "address",
      type: "text",
      value: form.address,
    },

    {
      label: "Current Password",
      name: "password",
      type: "password",
      required: true,
    },
  ];

  const handleOnPasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword" || name === "confirmPassword") {
      setError("");
      !disableBtn && setDisableBtn(true);
    }
    setPassUpdateForm({
      ...passUpdateForm,
      [name]: value,
    });
    if (name === "confirmPassword") {
      const { newPassword } = passUpdateForm;
      newPassword !== value && setError("Password does not match");
      newPassword.length < 6 &&
        setError("Password provided must be atleast 6 character");
      !/[A-Z]/.test(newPassword) &&
        setError("Password provided must contain Uppercase");
      !/[a-z]/.test(newPassword) &&
        setError("Password provided must contain lowercase");
      !/[0-9]/.test(newPassword) && setError("Password must contain number");

      !passUpdateForm.newPassword && setError("New Password must be provided");
    }
  };

  const handleOnPasswordSubmit = (e) => {
    e.preventDefault();

    const { currentPassword, confirmPassword, newPassword } = passUpdateForm;
    if (confirmPassword !== newPassword) {
      return alert("password do not match");
    }
    const obj = {
      newPassword,
      email: user.email,
      currentPassword,
    };

    dispatch(updatePassAction(obj));
  };

  const disableButton = () => {
    !error && setDisableBtn(false);
  };
  const resetPassFields = [
    {
      label: " Current Password",
      name: "currentPassword",
      type: "password",
      value: passUpdateForm.currentPassword,
      required: true,
    },
    {
      label: " New Password",
      name: "newPassword",
      type: "password",
      value: passUpdateForm.newPassword,
      required: true,
    },
    {
      label: " Confirm Password",
      name: "confirmPassword",
      type: "password",
      value: passUpdateForm.confirmPassword,
      required: true,
      onBlur: disableButton,
    },
  ];

  return (
    <AdminLayout>
      <div className="update-info">
        <h3>Your Profile</h3>
      </div>
      <Form onSubmit={handleOnSubmit}>
        {inputField.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <Button type="submit">Update Profile</Button>
      </Form>
      <hr />

      <div className="reset-password">
        <h3>Password Update</h3>
        <Form onSubmit={handleOnPasswordSubmit}>
          {resetPassFields.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnPasswordChange} />
          ))}
          <Form.Group>
            <Form.Text className="mb-3">
              {" "}
              Password must contain Uppercase, Lowercase, Number must be atleast
              6 character long
            </Form.Text>
            <div className="text-danger fw-bold mb-3">{error}</div>
          </Form.Group>
          <Button type="submit" disabled={disableBtn}>
            Update Password
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
