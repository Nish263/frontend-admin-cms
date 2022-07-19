import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { EditProductForm } from "../../components/product-form/EditProductForm";

import AdminLayout from "../layouts/AdminLayout";
import { fetchSingleProductsAction } from "./productAction";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  console.log(_id);

  useEffect(() => {
    _id && dispatch(fetchSingleProductsAction(_id));
  }, [_id]);
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
      <h2 className="mt-5">Edit Products</h2>
      <hr />

      <div>
        <EditProductForm />
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
