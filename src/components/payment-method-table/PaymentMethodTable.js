import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethods } from "../../pages/payment-method/PaymentMethodAction";

export const PaymentMethodTable = () => {
  const dispatch = useDispatch();

  const { paymentMethods } = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, []);

  return (
    <div className="">
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
                  <Button variant="warning">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Button>{" "}
                  <Button variant="danger">
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
