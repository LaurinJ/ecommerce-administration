import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ProductsTable } from "../components/table/ProductsTable";
import { GET_PRODUCTS } from "../queries/Query";
import Loader from "../components/Loader";

function AllProducts() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  return (
    <div className="relative h-full">
      {loading && <Loader />}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Seznam produktu</h1>
        <Link to="/add-product">
          <span className="p-2 bg-blue-300 rounded-sm">Přidat produkt</span>
        </Link>
      </div>
      <div className="mt-5">
        {data ? (
          <ProductsTable products={data.getProducts} />
        ) : (
          "Nejsou k dispozici žádné produkty"
        )}
      </div>
    </div>
  );
}

export default AllProducts;
