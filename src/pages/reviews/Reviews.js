import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../layouts/AdminLayout";
import { getReviewAction } from "./reviewAction";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);
  useEffect(() => {
    dispatch(getReviewAction());
  });
  return (
    <AdminLayout>
      <h4 className="py-3">Review</h4>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Id</th>
            <th>ProductId</th>
            <th>ProductName</th>
            <th>Rating</th>
            <th>Reviewed By</th>
            <th>Reviewed By Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item._id}</td>
              <td>{item.productId}</td>
              <td>{item.productName}</td>
              <td>{item.rating}</td>
              <td>{item.reviewedBy}</td>
              <td>{item.reviewedBy_id}</td>
              <td>
                <Button variant="warning"> Edit</Button>{" "}
                <Button variant="danger"> Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Reviews;
