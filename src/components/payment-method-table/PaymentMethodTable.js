import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentMethods,
  deletePaymentMethodAction,
  editPaymentMethodAction,
  fetchSinglePaymentMethod,
} from "../../pages/payment-method/PaymentMethodAction";
import { EditPaymentMethodForm } from "../payment-method-form/EditPaymentMethodForm";
import { PaymentMethodForm } from "../payment-method-form/PaymentMethodForm";

export const PaymentMethodTable = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();

  const { paymentMethods } = useSelector((state) => state.paymentMethods);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, []);

  const handleOnEditForm = (_id) => {
    setShowForm(false);
    dispatch(editPaymentMethodAction(_id));
  };
  return (
    <div className="">
      {showForm ? <PaymentMethodForm /> : <EditPaymentMethodForm />}

      <div className="mb-3 fw-bold">
        {" "}
        {paymentMethods.length} Payment methods found!!!!
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Status</th>
            <th> Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.length > 0 &&
            paymentMethods.map(({ _id, name, status, description }, i) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>{status}</td>
                <td>
                  {name}{" "}
                  <i
                    className="fa-solid fa-circle-info text-primary"
                    title={description}
                  ></i>
                </td>
                <td>
                  <Button
                    variant="warning"
                    title="Edit"
                    onClick={() => dispatch(fetchSinglePaymentMethod(_id))}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Button>{" "}
                  <Button
                    variant="danger"
                    title="Delete"
                    onClick={() =>
                      window.confirm(
                        "Are you sure you want to delete this payment method?"
                      ) && dispatch(deletePaymentMethodAction(_id))
                    }
                  >
                    <i class="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
