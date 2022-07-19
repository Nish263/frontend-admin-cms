import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { postCategoryAction } from "../../pages/categories/categoryAction";

const initialState = {
  status: "inactive",
  parentCatId: "",
  catName: "",
};
export const CategoryForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { categories } = useSelector((state) => state.category);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    console.log(checked, name, value);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const parentCatId = form.parentCatId ? form.parentCatId : undefined;

    dispatch(postCategoryAction({ ...form, parentCatId }));
  };

  return (
    <Form className="py-5" onSubmit={handleOnSubmit}>
      <Row className="g-3">
        <Col md="2">
          <Form.Check
            name="status"
            onChange={handleOnChange}
            type="switch"
            id="custom-switch"
            label="Status"
          />
        </Col>
        <Col md="3">
          <Form.Select
            name="parentCatId"
            defaultValue="Choose..."
            onChange={handleOnChange}
          >
            <option value="">.. Select parent Category ..</option>
            {categories.map(
              (item) =>
                !item.parentCatId && (
                  <option key={item._id} value={item._id}>
                    {item.catName}
                  </option>
                )
            )}
          </Form.Select>
        </Col>
        <Col md="4">
          <Form.Control
            name="catName"
            placeholder="Category Name"
            required
            onChange={handleOnChange}
          />
        </Col>
        <Col md="3">
          <Button type="submit">Add Category</Button>
        </Col>
      </Row>
    </Form>
  );
};
