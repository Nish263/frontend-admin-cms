import React, { useRef } from "react";
import { Button, Container, Form, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordResetOTPAction } from "../../pages/admin-profile/AdminProfileAction";

export const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { passResetResponse, isLoading } = useSelector((state) => state.admin);

  const emailRef = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    console.log(email);
    dispatch(requestPasswordResetOTPAction({ email }));
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h2>Reset Your Password!!</h2>
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
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Enter email"
              // value="a@a.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Button type="submit">Request OTP</Button>
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
