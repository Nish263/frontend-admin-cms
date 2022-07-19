import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/categories/categoryAction";
import { postProductAction } from "../../pages/products/productAction";

import { CustomInput } from "../custom-input/CustomInput";

const initialState = {
  catId: null,
  description: "",
  name: "",
  price: 0,
  qty: 0,
  salesPrice: 123,
  salesStartDate: "",
  salesEndDate: "",
};
export const ProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") value = checked ? "active" : "inactive";

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnImageSelect = (e) => {
    const { files } = e.target;
    console.log(files);
    setImages(files);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    images.length && [...images].map((img) => formData.append("images", img));
    dispatch(postProductAction(formData));
  };

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Product Name",
      required: true,
    },
    {
      name: "qty",
      label: "Qty",
      type: "number",
      placeholder: "50",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "$50",
      required: true,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "80",
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "date",
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "date",
    },
    {
      name: "description",
      // label: "Description",
      as: "textarea",
      rows: 10,
      required: true,
    },
    {
      name: "images",
      type: "file",
      multiple: true,
      accept: "img/*",
      required: true,
    },
  ];
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3">
        <Form.Check
          name="status"
          onChange={handleOnChange}
          type="switch"
          id="custom-switch"
          label="Status"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Select
          name="catId"
          defaultValue="Choose..."
          onChange={handleOnChange}
          required
        >
          <option value="">.. Select parent Category ..</option>
          {categories.map(
            (item) =>
              item.parentCatId && (
                <option key={item._id} value={item._id}>
                  {item.catName}
                </option>
              )
          )}
        </Form.Select>
      </Form.Group>

      {inputFields.map((item, i) => (
        <CustomInput
          key={i}
          {...item}
          onChange={
            item.name === "images" ? handleOnImageSelect : handleOnChange
          }
        />
      ))}
      <Form.Group className="mb-3"></Form.Group>
      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};
