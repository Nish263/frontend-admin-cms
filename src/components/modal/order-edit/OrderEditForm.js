import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CustomTable } from "../../custom-table/CustomTable";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";

export const OrderEditForm = () => {
  const { orders } = useSelector((state) => state.orders);
  const { _id } = useParams();
  const selectedOrder = orders.filter((order) => order._id === _id);

  if (selectedOrder.length < 1) {
    return <h1> Order not found, Please go back and refresh the page</h1>;
  }
  const order = selectedOrder[0];
  const { buyer, cart, paymentInfo, status, totalAmount } = order;

  console.log(order);
  const tableHeader = [];
  return (
    <div>
      <div className="status fw-bold py-2 d-flex justify-content-between">
        <div>Status:{status} </div>
        <div>
          <Form className="d-flex jusify-content-center py-2">
            <Form.Select>
              <option value=""> --select --</option>
              <option value="shipped"> Shipped</option>
              <option value="cancelled"> Cancelled</option>
            </Form.Select>{" "}
            <Button variant="primary"> Mark as</Button>
          </Form>
        </div>
      </div>
      <div className="shippingInfo border p-2 mb-2">
        <h4> Buyer Info</h4>
        <hr />
        Order Date: 20-10-2022 <br />
        Name: {buyer.fname} {buyer.lname} <br />
        Phone: {buyer.phone} <br />
        Email: {buyer.email}
        <br />
        Shipping Address: {buyer.address} <br />
      </div>
      <div className="payment-details  border p-2 mb-2">
        <h4>Payment Details </h4>
        <hr />
        Status: {paymentInfo.status} <br />
        Total Paid: {paymentInfo.paidAmount} <br />
        Paid Date: {paymentInfo.paidDate} <br />
        Payment Method: {paymentInfo.method} <br />
        Transaction Id :{paymentInfo.transactionId} <br />
        <br />
      </div>
      <div className="order-details  border p-2 mb-2">
        {" "}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbnail</th>
              <th> Name</th>
              <th>Unit price</th>
              <th>Qty</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img src={item.thumbnail} width="80px" />
                </td>
                <td>{item.productName}</td>
                <td>{item.salesPrice}</td>
                <td>{item.qty}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan={5}>Total</td>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="note-box  border p-2 mb-2">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Add Notes</Form.Label>
            <Form.Control as="textarea" placeholder="Add note" row="5" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check label="Send email to customer" />
          </Form.Group>
          <Button variant="primary"> Submit</Button>
        </Form>
      </div>
      <div className="note-history mt-5"></div>
    </div>
  );
};
