import React from "react";
import { CategoryForm } from "../../components/category-form/CategoryForm";
import AdminLayout from "../layouts/AdminLayout";
import { CategoryTable } from "../../components/category-table/CategoryTable";

const Categories = () => {
  return (
    <AdminLayout>
      {/* form */}
      <h3 className="mt-3">Category </h3>
      <CategoryForm />
      <hr />
      {/* table */}
      <CategoryTable />
    </AdminLayout>
  );
};

export default Categories;
