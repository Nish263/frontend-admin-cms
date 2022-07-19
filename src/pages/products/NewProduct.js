import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductForm } from "../../components/product-form/ProductForm";

import AdminLayout from "../layouts/AdminLayout";

const NewProduct = () => {
  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/products">
          <Button variant="secondary">
            {" "}
            <i className="fa-solid fa-angle-left"></i> Back
          </Button>
        </Link>
      </div>
      <h2 className="mt-5">Add New Products</h2>
      <hr />

      <div>
        <ProductForm />
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
