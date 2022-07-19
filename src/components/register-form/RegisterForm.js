import React, { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import "./registerForm.css";
import { useDispatch, useSelector } from "react-redux";
import { postUserAction } from "../../pages/register-login/signInUpAction";
import { Link } from "react-router-dom";

const initialState = {
  fname: "Sam",
  lname: "smith",
  email: "me@gmail.com",
  phone: "02456677890",
  dob: "1990-10-20",
  password: "1234567",
  confirmPassword: "1234567",
};
export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(false);

  // pull data from redux store

  const { isLoading, response } = useSelector((state) => state.signInUp);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError(true);
    }
    setError(false);
    console.log(form);

    const { confirmPassword, ...rest } = form;
    // we dispatch the action to the reducer
    dispatch(postUserAction(rest));
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h1>Register Form</h1>
        <hr />
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Frist Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="fname"
              value={form.fname}
              placeholder="Sam"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="lname"
              value={form.lname}
              placeholder="Smith"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="dob"
              value={form.dob}
              type="date"
              placeholder="2020-10-10"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="phone"
              value={form.phone}
              placeholder="10 george st Sydne"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="address"
              value={form.address}
              placeholder="10 george st Sydne"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              value={form.email}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              value={form.password}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="confirmPassword"
              value={form.confirmPassword}
              type="password"
              placeholder="Password"
              required
            />
            <Alert variant="danger" show={error}>
              Confirm password do not match!
            </Alert>
            <Form.Group>
              {response.message && (
                <Alert
                  variant={response.status === "success" ? "success" : "danger"}
                >
                  {response.message}
                </Alert>
              )}
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Button type="submit">
              {isLoading ? (
                <Spinner variant="primary" animation="border" />
              ) : (
                "Sign Up"
              )}
              {/* Sign Up */}
            </Button>
          </Form.Group>
        </Form>
        <div className="text-end">
          Already have an account ? <Link to="/">Login Now</Link>
        </div>
      </div>
    </Container>
  );
};
