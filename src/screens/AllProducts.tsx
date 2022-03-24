import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { ProductsTable } from "../components/table/ProductsTable";
import { GET_PRODUCTS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/SearchWithFilter";
import { SEARCH } from "../queries/Query";
import Pagination from "../components/Pagination";

function AllProducts() {
  const [page, setPage] = useState(1);
  const [search, { loading, error, data }] = useLazyQuery(SEARCH, {
    variables: { skip: page, limit: 10, params: { title: "" } },
  });

  const handleClick = (page: number) => {
    setPage(page);
    // search({ variables: { skip: page, limit: 10, params: { title: "" } } });
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="relative h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-between">
        <h1 className="w-56 text-2xl">Seznam produktu</h1>
        <div>
          <Search searchFunc={search} />
        </div>
        <Link to="/add-product">
          <span className="p-2 bg-blue-300 rounded-sm">Přidat produkt</span>
        </Link>
      </div>
      <div className="mt-5">
        {error && data?.getFilterProducts.products.length === 0 && (
          <h4>Nejsou k dispozici žádné produkty</h4>
        )}
        {data && <ProductsTable products={data.getFilterProducts.products} />}
      </div>
      {data?.getFilterProducts.pages > 1 && (
        <Pagination
          page={page}
          pages={data.getFilterProducts.pages}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default AllProducts;
