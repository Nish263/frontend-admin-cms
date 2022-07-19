import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../layouts/AdminLayout";
import { getCustomersAction, getOrderAction } from "./orderAction";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getOrderAction());
  }, []);

  return (
    <AdminLayout>
      <h4 className="py-3"> Order Management</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Buyer Name</th>
            <th> Order Total</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.buyer.fname}</td>
              <td>{item.totalAmount}</td>
              <td>{item.paymentInfo.status}</td>
              <td>
                <Button variant="link"> Info</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Order;
