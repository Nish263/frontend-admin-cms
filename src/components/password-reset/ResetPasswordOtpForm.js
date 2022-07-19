import React, { useState } from "react";
import { Button, Container, Form, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetPassAction } from "../../pages/admin-profile/AdminProfileAction";

const initialState = {
  otp: "",
  password: "",
  confirmPassword: "",
};
export const ResetPasswordOtpForm = () => {
  const dispatch = useDispatch();
  const { passResetResponse, isLoading, passResettingEmail } = useSelector(
    (state) => state.admin
  );
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [disableBtn, setDisableBtn] = useState("true");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setError("");
    !disableBtn && setDisableBtn(true);
    setForm({
      ...form,
      [name]: value,
    });
    if (name === "confirmPassword") {
      const { password } = form;
      password !== value && setError("Password does not match");
      password.length < 6 &&
        setError("Password provided must be atleast 6 character");
      !/[A-Z]/.test(password) &&
        setError("Password provided must contain Uppercase");
      !/[a-z]/.test(password) &&
        setError("Password provided must contain lowercase");
      !/[0-9]/.test(password) && setError("Password must contain number");

      !form.password && setError("New Password must be provided");
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("password do not match");
    }
    rest.email = passResettingEmail;
    dispatch(resetPassAction(rest));
  };

  const disableButton = () => {
    !error && setDisableBtn(false);
  };
  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h2>Reset Password!!</h2>
        <hr />
        {isLoading && <Spinner variant="primary" animation="border" />}
        {passResetResponse.message && (
          <Alert
            variant={
              passResetResponse.status === "success" ? "success" : "danger"
            }
          >
            {passResetResponse.message}
          </Alert>
        )}
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              name="otp"
              type="number"
              required
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              required
              onChange={handleOnChange}
              onBlur={disableButton}
            />
            <Form.Text>
              {" "}
              Password must contain Uppercase, Lowercase, Number must be atleast
              6 character long
            </Form.Text>
          </Form.Group>
          <div className="text-danger fw-bold mb-3">{error}</div>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Button type="submit" disabled={disableBtn}>
              Update Password
            </Button>
          </Form.Group>
        </Form>
        <div className="text-end">
          {" "}
          <a href="/">Login</a>Now
        </div>
      </div>
    </Container>
  );
};
