import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/categories/categoryAction";
import { updateProductAction } from "../../pages/products/productAction";

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
  thumbnail: "",
  images: [],
};
export const EditProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { selectedProducts } = useSelector((state) => state.products);
  const [form, setForm] = useState(initialState);
  const [newImages, setImages] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    setForm(selectedProducts);
  }, [selectedProducts]);

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
    if (!window.confirm("Are you sure you want to update this product")) return;
    console.log(form);
    const { __v, updatedAt, createdAt, slug, sku, image, ratings, ...rest } =
      form;

    rest.salesPrice = Number(rest.salesPrice) ? +rest.salesPrice : 0;
    rest.salesStartDate = rest.salesStartDate ? rest.salesStartDate : null;
    rest.salesEndDate = rest.salesEndDate ? rest.salesEndDate : null;

    // bundle data in formdata
    const formData = new FormData();
    for (const key in rest) {
      console.log(key, form[key]);
      formData.append(key, rest[key]);
    }
    newImages.length &&
      [...newImages].map((img) => formData.append("newImages", img));
    formData.append("imgToDelete", imgToDelete);

    dispatch(updateProductAction(formData));
  };

  const handleOnImageDelete = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((imgPath) => imgPath !== value));
    }
  };
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.name,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.slug,
      disabled: true,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.sku,
      disabled: true,
    },
    {
      name: "qty",
      label: "Qty",
      type: "number",
      placeholder: "50",
      required: true,
      value: form.qty,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "$50",
      required: true,
      value: form.price,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "80",
      value: form.salesPrice,
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "date",
      value: form.salesStartDate ? form.salesStartDate.split("T")[0] : "",
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "date",
      value: form.salesEndDate ? form.salesEndDate.split("T")[0] : "",
    },
    {
      name: "description",
      label: "Description",
      as: "textarea",
      value: form.description,
    },
    {
      name: "images",
      type: "file",
      multiple: true,
      accept: "img/*",
    },
  ];
  console.log(imgToDelete);
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3">
        <Form.Check
          name="status"
          onChange={handleOnChange}
          type="switch"
          id="custom-switch"
          label="status"
          checked={form.status === "active"}
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
          {categories.map((item) => (
            <option
              key={item._id}
              value={item._id}
              selected={item._id === selectedProducts.catId}
            >
              {item.catName}
            </option>
          ))}
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
      <div className="imgs">
        {selectedProducts.images &&
          selectedProducts.images.length > 0 &&
          selectedProducts.images.map((imgLink) => (
            <div className="imgs p-2">
              <Form.Check
                type="radio"
                label="Use as thumbnail"
                name="thumbnail"
                onChange={handleOnChange}
                value={imgLink}
                checked={imgLink === form.thumbnail}
              >
                {" "}
              </Form.Check>
              <img
                key={imgLink}
                src={process.env.REACT_APP_IMAGE_SERVER_URL + imgLink.substr(6)}
                alt="product"
                width="150px"
                crossOrigin="anonymous"
                className="img-thumnail rounded"
                value={imgLink}
              />
              <Form.Check
                label="Delete"
                value={imgLink}
                onChange={handleOnImageDelete}
              >
                {" "}
              </Form.Check>
            </div>
          ))}
      </div>
      <Button variant="primary" type="submit">
        Update Product
      </Button>
    </Form>
  );
};
