import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  fetchCategoriesAction,
} from "../../pages/categories/categoryAction";
import { toggleModal } from "../../system-state/systemSlice";
import { EditCategoryForm } from "../category-form/EditCategoryForm";

export const CategoryTable = () => {
  const dispatch = useDispatch();

  const [selectedCat, setSelectedCat] = useState({});
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    //call api to fetch all the cats and set in the store
    dispatch(fetchCategoriesAction());
  }, []);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(_id));
    }
  };

  const handleOnEdit = (cat) => {
    setSelectedCat(cat);
    dispatch(toggleModal());
  };

  const parentCats = categories.filter((item) => !item.parentCatId);
  const childCats = categories.filter((item) => item.parentCatId);
  return (
    <div>
      <EditCategoryForm selectedCat={selectedCat} />
      <p>{categories.length} Categories found!</p>
      <Table striped>
        <thead>
          <tr>
            {/* <th>#</th> */}

            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parentCats.map((item, i) => (
            <>
              <tr key={item._id}>
                {/* <td>{i + 1}</td> */}
                <td>{item.catName}</td>
                <td
                  className={
                    item.status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {item.status}
                </td>

                <td>
                  <Button variant="warning" onClick={() => handleOnEdit(item)}>
                    Edit
                  </Button>{" "}
                  <Button
                    title="You can only delete if child category does not exist"
                    onClick={() => handleOnDelete(item._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
              {childCats.map(
                (cat) =>
                  cat.parentCatId === item._id && (
                    <tr key={cat._id}>
                      {/* <td>{i + 1}</td> */}
                      <td>
                        <span role="img" aria-label="right -arrow">
                          ➡️
                        </span>
                        {cat.catName}
                      </td>
                      <td
                        className={
                          cat.status === "active"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {cat.status}
                      </td>

                      <td>
                        <Button
                          variant="warning"
                          onClick={() => handleOnEdit(cat)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          title="You can only delete if child category does not exist"
                          onClick={() => handleOnDelete(cat._id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
              )}
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
