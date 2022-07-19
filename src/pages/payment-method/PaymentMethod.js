import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";
import { PaymentMethodTable } from "../../components/payment-method-table/PaymentMethodTable";
import { PaymentMethodForm } from "../../components/payment-method-form/PaymentMethodForm";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../system-state/systemSlice";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  return (
    <AdminLayout>
      <PaymentMethodForm />
      <Row className="mt-5">
        <Col className="text-center">
          <h1>Payment Method</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-end mb-4">
          <Button variant="primary" onClick={() => dispatch(toggleModal())}>
            <i class="fa-solid fa-square-plus text-center"></i> Add New Payment
            Method{" "}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <PaymentMethodTable />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default PaymentMethod;
