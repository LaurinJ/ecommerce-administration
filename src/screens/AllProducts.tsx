import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ProductsTable } from "../components/table/ProductsTable";
import Loader from "../components/Loader";
import Search from "../components/SearchWithFilter";
import { SEARCH } from "../queries/Query";
import Pagination from "../components/Pagination";

function AllProducts() {
  const [page, setPage] = useState<number>(1);
  const [search, { loading, error, data }] = useLazyQuery(SEARCH, {
    notifyOnNetworkStatusChange: true,
    variables: { skip: page, limit: 10, params: { title: "" } },
  });

  const handleClick = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="w-56 text-2xl">Seznam produktu</h1>
        <div>
          <Search searchFunc={search} />
        </div>
        <Link to="/add-product">
          <span className="btn">Přidat produkt</span>
        </Link>
      </div>
      <div className="screen_container">
        {loading && <Loader />}
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
