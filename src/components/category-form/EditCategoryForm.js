import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryAction } from "../../pages/categories/categoryAction";

import { VerticalModal } from "../modal/Modal";

const initialState = {
  status: "inactive",
  parentCatId: "",
  catName: "",
};
export const EditCategoryForm = ({ selectedCat }) => {
  console.log(selectedCat);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    setForm(selectedCat);
  }, [selectedCat]);

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

    console.log(form);
    const { parentCatId, catName, status, _id } = form;
    // dispatch action to update the category
    dispatch(
      updateCategoryAction({
        parentCatId,
        catName,
        status,
        _id,
      })
    );
  };

  return (
    <VerticalModal title="Edit Category">
      <Form className="py-5" onSubmit={handleOnSubmit}>
        <Row className="g-3">
          <Col md="2">
            <Form.Check
              name="status"
              onChange={handleOnChange}
              type="switch"
              id="custom-switch"
              label="Status"
              checked={form.status === "active"}
            />
          </Col>
          <Col md="3">
            <Form.Group controlId="formGridState">
              <Form.Select
                name="parentCatId"
                defaultValue="Choose..."
                onChange={handleOnChange}
              >
                <option value="">.. Select parent Category ..</option>
                {categories.map(
                  (item) =>
                    !item.parentCatId && (
                      <option
                        key={item._id}
                        value={item._id}
                        selected={item._id === form.parentCatId}
                      >
                        {item.catName}
                      </option>
                    )
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Control
              name="catName"
              value={form.catName}
              placeholder="Category Name"
              required
              onChange={handleOnChange}
            />
          </Col>
          <Col md="3">
            <Button type="submit">Update Category</Button>
          </Col>
        </Row>
      </Form>
    </VerticalModal>
  );
};
