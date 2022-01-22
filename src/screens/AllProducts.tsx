import React from "react";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ProductsTable } from "../components/table/ProductsTable";
import { GET_PRODUCTS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { SEARCH } from "../queries/Query";

function AllProducts() {
  // const { loading, error, data } = useLazyQuery(GET_PRODUCTS);
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);

  return (
    <div className="relative h-full">
      {loading && <Loader />}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Seznam produktu</h1>
        <div>
          <Search searchFunc={search} />
        </div>
        <Link to="/add-product">
          <span className="p-2 bg-blue-300 rounded-sm">Přidat produkt</span>
        </Link>
      </div>
      <div className="mt-5">
        {data ? (
          <ProductsTable products={data.getFilterProducts} />
        ) : (
          "Nejsou k dispozici žádné produkty"
        )}
      </div>
    </div>
  );
}

export default AllProducts;
