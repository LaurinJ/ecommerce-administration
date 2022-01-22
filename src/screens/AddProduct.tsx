import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/form/ProductForm";

type ProductSlug = {
  slug: string;
};

function AddProduct() {
  const { slug } = useParams<ProductSlug>();
  return (
    <React.Fragment>
      <h1 className="text-2xl">Add New Product</h1>
      <div className="mt-5">
        <ProductForm slug={slug} />
      </div>
    </React.Fragment>
  );
}

export default AddProduct;
