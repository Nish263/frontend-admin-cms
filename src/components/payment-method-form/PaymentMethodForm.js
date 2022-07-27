import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postPaymentMethodAction } from "../../pages/payment-method/PaymentMethodAction";
import { CustomInput } from "../custom-input/CustomInput";
import { VerticalModal } from "../modal/Modal";

const initialState = {
  status: "inactive",
  name: "",
  description: "",
};
export const PaymentMethodForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    let { checked, value, name } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postPaymentMethodAction(form));
  };
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      required: true,
    },
  ];

  return (
    <VerticalModal>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="status"
            label="Status"
            onChange={handleOnChange}
          ></Form.Check>
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            {" "}
            Add Payment Method
          </Button>
        </Form.Group>
      </Form>
    </VerticalModal>
  );
};
