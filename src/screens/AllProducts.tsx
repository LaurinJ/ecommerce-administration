import React from "react";
import { useQuery } from "@apollo/client";
import { ProductsTable } from "../components/ProductsTable";
import { GET_PRODUCTS } from "../queries/Query";

function AllProducts() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  return (
    <React.Fragment>
      <h1 className="text-2xl">All Products</h1>
      <div className="mt-5">
        <ProductsTable products={data.getProducts} />
      </div>
    </React.Fragment>
  );
}

export default AllProducts;
