import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductTable } from "../../components/product-table/ProductTable";
import AdminLayout from "../layouts/AdminLayout";

const Product = () => {
  return (
    <AdminLayout>
      <h2 className="mt-5"> Products</h2>
      <div className="text-end">
        <Link to="/product/new">
          <Button variant="primary">
            {" "}
            <i className="fa-solid fa-plus"></i> Add new product
          </Button>
        </Link>
        <hr />
      </div>
      <div className="product-list">
        <ProductTable />
      </div>
    </AdminLayout>
  );
};

export default Product;
