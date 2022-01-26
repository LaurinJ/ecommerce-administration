import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { ProductsTable } from "../components/table/ProductsTable";
import { GET_PRODUCTS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { SEARCH } from "../queries/Query";
import Pagination from "../components/Pagination";

function AllProducts() {
  // const { loading, error, data } = useLazyQuery(GET_PRODUCTS);
  const [page, setPage] = useState(1);
  // const [search, { loading, data, fetchMore }] = useLazyQuery(SEARCH, {
  const [search, { loading, data, fetchMore }] = useLazyQuery(SEARCH, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    variables: { skip: page, limit: 10, params: { title: "" } },
  });

  const handleClick = (page: number) => {
    console.log(page);
    setPage(page);
    search({ variables: { skip: page, limit: 10, params: { title: "" } } });
    // fetchMore({
    //   variables: { skip: page + 1, limit: 10 },
    // }).then((data) => {
    //   setPage(page + 1);
    // });
  };

  useEffect(() => {
    search({ variables: { skip: page, limit: 10, params: { title: "" } } });
  }, []);

  return (
    <div className="relative h-full">
      {loading && <Loader />}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Seznam produktu</h1>
        <div>{/* <Search searchFunc={search} /> */}</div>
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
      {/* <button onClick={handleClick}>Fetch more</button> */}
      {data && data.getFilterProducts.pages > 1 ? (
        <Pagination
          page={page}
          pages={data.getFilterProducts.pages}
          handleClick={handleClick}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default AllProducts;
