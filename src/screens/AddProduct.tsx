import React from "react";
import ProductForm from "../components/form/ProductForm";

function AddProduct() {
  return (
    <React.Fragment>
      <h1 className="text-2xl">Add New Product</h1>
      <div className="mt-5">
        <ProductForm />
      </div>
    </React.Fragment>
  );
}

export default AddProduct;
