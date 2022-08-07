import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentMethodAction } from "../../pages/payment-method/PaymentMethodAction";

import { CustomInput } from "../custom-input/CustomInput";
import { VerticalModal } from "../modal/Modal";

const initialState = {
  status: "inactive",
  name: "",
  description: "",
};
export const EditPaymentMethodForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { selectedPaymentMethods } = useSelector(
    (state) => state.paymentMethods
  );

  useEffect(() => {
    setForm(selectedPaymentMethods);
  }, [selectedPaymentMethods]);

  const handleOnChange = (e) => {
    let { checked, value, name } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { createdAt, updatedAt, __v, ...rest } = form;
  };
  dispatch(updatePaymentMethodAction(form));
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      value: form.name,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      required: true,
      value: form.description,
    },
  ];

  return (
    <VerticalModal title="Add New Payment Method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="status"
            label="Status"
            onChange={handleOnChange}
            checked={form.status === "status"}
          ></Form.Check>
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            {" "}
            Update Payment Method
          </Button>
        </Form.Group>
      </Form>
    </VerticalModal>
  );
};
