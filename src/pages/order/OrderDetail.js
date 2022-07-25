import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "../layouts/AdminLayout";
import { getOrderAction } from "./orderAction";

import { Link, useParams } from "react-router-dom";
import { OrderEditForm } from "../../components/modal/order-edit/OrderEditForm";

const OrderDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderAction());
  }, []);

  return (
    <AdminLayout>
      <div className="mt-3">
        <Link to="/orders" className="text-decoration-none text-secondary ">
          {" "}
          &lt; Back{" "}
        </Link>
      </div>

      <h4 className="py-3"> Order Detail</h4>
      <OrderEditForm />
    </AdminLayout>
  );
};

export default OrderDetails;
