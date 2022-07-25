import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../layouts/AdminLayout";
import { getOrderAction } from "./orderAction";
import Table from "react-bootstrap/Table";
import { Button, Form, Pagination } from "react-bootstrap";
import OrderDetails from "./OrderDetail";
import { Link } from "react-router-dom";
import { PaginationComp } from "../../components/pagination/Pagination";

const productPerPage = 10;
const Order = () => {
  const dispatch = useDispatch();
  const [dispOrder, setDisplayOrder] = useState([]);
  const [active, setActive] = useState(1);
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getOrderAction());
    }

    setDisplayOrder(orders);
  }, [orders]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    if (!value) {
      return setDisplayOrder(orders);
    }
    const filterArg = orders.filter((item) => item.status === value);
    setDisplayOrder(filterArg);
  };
  // pagenation logic
  const handleOnPagenationClick = (page) => {
    setActive(page);
  };
  const pages = Math.ceil(dispOrder.length / productPerPage);
  const productStartAt = (active - 1) * productPerPage;
  const productEndAt = productStartAt + 10;
  return (
    <AdminLayout>
      <h4 className="py-3"> Order Management</h4>
      <div className="d-flex justify-content-between py-3 ">
        <div> {dispOrder.length} order found!!!</div>

        <div className=" py-2">
          <Form className="d-flex">
            <Form.Select onChange={handleOnChange}>
              <option value=""> --select --</option>
              <option value="processing"> Processing</option>
              <option value="shipped"> Shipped</option>
              <option value="cancelled"> Cancelled</option>
            </Form.Select>{" "}
          </Form>
        </div>
      </div>

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
          {dispOrder.map(
            (item, i) =>
              i >= productStartAt &&
              i < productEndAt && (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.status}</td>
                  <td>{item.buyer.fname}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.paymentInfo.status}</td>
                  <td>
                    <Link to={`/orders/${item._id}`}> Info </Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <PaginationComp
        pages={pages}
        active={active}
        handleOnPagenationClick={handleOnPagenationClick}
      />
    </AdminLayout>
  );
};

export default Order;
