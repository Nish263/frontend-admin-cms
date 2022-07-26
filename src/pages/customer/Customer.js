import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../layouts/AdminLayout";
import { getCustomersAction } from "./customerAction";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import { PaginationComp } from "../../components/pagination/Pagination";

const Customer = () => {
  const productPerPage = 5;

  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);
  const [dispCustom, setDispCustom] = useState([]);
  const [active, setActive] = useState(1);
  useEffect(() => {
    !dispCustom.length && dispatch(getCustomersAction());
    setDispCustom(customers);
  }, [customers]);

  const handleOnPaginationPage = (page) => {
    setActive(page);
  };

  const handleOnRealTimeSearch = (e) => {
    const { value } = e.target;
    setDispCustom(
      customers.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const pages = Math.ceil(customers.length / productPerPage);
  const productStartAt = (active - 1) * productPerPage;
  const productEndAt = productStartAt + 5;
  console.log(customers);
  return (
    <AdminLayout>
      <h4 className="py-3"> Customer Management</h4>
      <div className="mt-5 d-flex justify-content-end  py-3">
        <Form.Control
          name="search"
          placeholder="Search"
          onChange={handleOnRealTimeSearch}
        ></Form.Control>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {dispCustom.map(
            (item, i) =>
              i >= productStartAt &&
              i < productEndAt && (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Button variant="link"> Info</Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <PaginationComp
        pages={pages}
        active={active}
        handleOnPagenationClick={handleOnPaginationPage}
      />
    </AdminLayout>
  );
};

export default Customer;
