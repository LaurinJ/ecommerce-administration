import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { ProductsTable } from "../components/table/ProductsTable";
import { GET_PRODUCTS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { SEARCH } from "../queries/Query";
import Pagination from "../components/Pagination";

function AllProducts() {
  // const { loading, error, data } = useLazyQuery(GET_PRODUCTS);
  const [search, { loading, data, fetchMore }] = useLazyQuery(SEARCH);
  // console.log(data?.getCountPages);

  const [page, setPage] = useState(1);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPage(page + 1);
    fetchMore({
      variables: { skip: page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.getFilterProducts.products = [
          ...prevResult.getFilterProducts.products,
          ...fetchMoreResult.getFilterProducts.products,
        ];
        return fetchMoreResult;
      },
    });
  };

  useEffect(() => {
    search({ variables: { params: { title: "" } } });
  }, []);

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
          <ProductsTable products={data.getFilterProducts.products} />
        ) : (
          "Nejsou k dispozici žádné produkty"
        )}
      </div>
      <button onClick={handleClick}>Fetch more</button>
      {data && data.getFilterProducts.pages > 1 ? (
        <Pagination page={1} pages={data.getFilterProducts.pages} />
      ) : (
        ""
      )}
    </div>
  );
}

export default AllProducts;
