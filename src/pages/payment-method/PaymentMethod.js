import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";
import { PaymentMethodTable } from "../../components/payment-method-table/PaymentMethodTable";
import { PaymentMethodForm } from "../../components/payment-method-form/PaymentMethodForm";
import { toggleModal } from "../../system-state/systemSlice";
import { useDispatch } from "react-redux";

const PaymentMethod = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const handleOnAddPM = () => {
    setShowForm(true);
    dispatch(toggleModal());
  };

  return (
    <AdminLayout>
      {/* {showForm && <PaymentMethodForm />} */}
      <Row className="mt-3 mb-5">
        <Col>
          <h1>Payment Methods</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-end">
          <Button variant="primary" onClick={handleOnAddPM}>
            <i className="fa-solid fa-plus"></i> Add New Payment Method
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <PaymentMethodTable showForm={showForm} setShowForm={setShowForm} />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default PaymentMethod;
