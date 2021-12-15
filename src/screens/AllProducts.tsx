import React from "react";
import { useQuery, gql } from "@apollo/client";
import {ProductsTable} from "../components/ProductsTable";

const ALL_PRODUCTS = gql`
  query Query {
    getProducts(limit: 10) {
      _id
      title
      price
      countInStock
    }
  }
`;

function AllProducts() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS);

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
