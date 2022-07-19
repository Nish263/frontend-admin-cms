import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomCard } from "../custom-card/CustomCard";
import { CustomTable } from "../custom-table/CustomTable";
import AdminLayout from "../layouts/AdminLayout";
import { fetchProductsAction } from "../products/productAction";

const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    !products.length && dispatch(fetchProductsAction());
  }, []);
  // order info
  const clientHeader = ["fname", "lname", "Joined Date"];
  const clientInfo = [
    {
      fname: "Jenny",
      lname: "smith",
      joinedAt: "20/12/2011",
    },
    {
      fname: "Jenny",
      lname: "smith",
      joinedAt: "20/12/2011",
    },
    {
      fname: "Jenny",
      lname: "smith",
      joinedAt: "20/12/2011",
    },
    {
      fname: "Jan",
      lname: "joe",
      joinedAt: "20/12/2011",
    },
  ];
  // orderinfo
  const tableHeader = ["Status", "Name", "Order Date", "Order Total"];
  const tableData = [
    {
      status: "Processing",
      fname: "Sam",
      orderDate: "23-12-2022",
      orderTotal: "567",
    },
    {
      status: "Payment pending",
      fname: "ram",
      orderDate: "23-12-2022",
      orderTotal: "567",
    },
    {
      status: "shipped",
      fname: "Samy",
      orderDate: "23-12-2012",
      orderTotal: "567",
    },
    {
      status: "processing",
      fname: "Saim",
      orderDate: "23-12-2022",
      orderTotal: "567",
    },
  ];
  const activeProduct = products.filter(
    (product) => product.status === "active"
  );
  const inactiveProduct = products.filter(
    (product) => product.status === "inactive"
  );
  return (
    <AdminLayout>
      <h4 className="py-3">Dashboard</h4>
      <h5>Product Summary</h5>
      <hr />
      <Row className="g-3">
        <Col md="4">
          {" "}
          <CustomCard title="Total Products" count={products.length} />
        </Col>

        <Col md="4">
          {" "}
          <CustomCard title="Active Products" count={activeProduct} />
        </Col>
        <Col md="4">
          <CustomCard title="Inactive Products" count={inactiveProduct} />
        </Col>
      </Row>

      <div className="client-info mt-5">
        <h5>Client Summary</h5>
        <hr />
        <CustomTable tableHeader={clientHeader} tableData={clientInfo} />
      </div>
      {/* <div className="product-info py-4"></div> */}
      <div className="user-info mt-5">
        <h5>Order Summary</h5>
        <hr />
        <CustomTable tableHeader={tableHeader} tableData={tableData} />
      </div>
      <div className="last-orders"></div>
      <div className="top-selling"></div>
    </AdminLayout>
  );
};

export default Dashboard;
