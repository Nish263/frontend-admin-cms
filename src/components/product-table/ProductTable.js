import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteProductAction,
  fetchProductsAction,
} from "../../pages/products/productAction";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const [ids, setIds] = useState([]);

  const { products } = useSelector((state) => state.products);

  const [displayProd, setDisplayProd] = useState([]);
  useEffect(() => {
    //call api to fetch all the cats and set in the store
    !displayProd.length && dispatch(fetchProductsAction());
    products.length && setDisplayProd(products);
  }, [products]);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);

    if (value === "all") {
      if (checked) {
        const allIds = products.map((item) => item._id);
        setIds(allIds);
      } else {
        setIds([]);
      }
      return;
    }
    // individual click
    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };

  const handleOnFilter = (e) => {
    const { value } = e.target;
    if (!value) {
      setDisplayProd(products);
    } else {
      setDisplayProd(products.filter((item) => item.status === value));
    }
  };

  const handleRealTimeSearch = (e) => {
    const { value } = e.target;
    setDisplayProd(
      products.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <div style={{ overflowX: "scroll" }} className="mb-5">
      <div className="mt-5" d-flex justify-content-end>
        <Form.Control
          name="search"
          placeholder="Search"
          onChange={handleRealTimeSearch}
        ></Form.Control>
        <div>
          <Form.Select className="m-3" onChange={handleOnFilter}>
            <option value=""> ---</option>
            <option value="active"> Active</option>
            <option value="inactive"> Inactive</option>
          </Form.Select>
        </div>
      </div>
      <hr />
      <div>{displayProd.length} Products found!</div>
      <Table striped>
        <thead>
          <tr>
            <th>
              <Form.Check
                name="status"
                id="custom-switch"
                value="all"
                onChange={handleOnSelect}
              />
            </th>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>QTY</th>
            <th>Price</th>
            <th>Sales Price</th>
            <th>Sales Date</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayProd.map((item, i) => (
            <tr key={item._id}>
              <td>
                <Form.Check
                  name="status"
                  id="custom-switch"
                  onChange={handleOnSelect}
                  value={item._id}
                  checked={ids.includes(item._id)}
                />
              </td>
              <td>{i + 1}</td>
              <td
                className={
                  item.status === "active" ? "text-success" : "text-danger"
                }
              >
                {item.status}
              </td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price.toLocaleString()}</td>
              <td>{item.salePrice || "-"}</td>
              <td>
                {item.salesStartDate
                  ? new Date(item.salesStartDate).toLocaleDateString() +
                    " - " +
                    new Date(item.salesEndDate).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                <Link to={`/product/edit/${item._id}`}>
                  <Button variant="warning">Edit</Button>{" "}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        {ids.length > 0 && (
          <Button
            title="You can only delete if child category does not exist"
            onClick={() => dispatch(deleteProductAction(ids)) && setIds([])}
            variant="danger"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};
