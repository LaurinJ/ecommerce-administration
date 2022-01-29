import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_ORDERS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { SEARCH } from "../queries/Query";
import Pagination from "../components/Pagination";
import { OrdersTable } from "../components/table/OrdersTable";

export default function AllOrders() {
  const [page, setPage] = useState(1);
  const [search, { loading, error, data }] = useLazyQuery(GET_ORDERS, {
    variables: { skip: page, limit: 10, params: { numberOrder: "" } },
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
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="w-56 text-2xl">Seznam objednávek</h1>
        <div>
          <Search searchFunc={search} />
        </div>
        <Link to="/add-product">
          <span className="p-2 bg-blue-300 rounded-sm">Přidat produkt</span>
        </Link>
      </div>
      <div className="mt-5">
        {error ||
          (data?.getOrders.orders.length === 0 && (
            <h4>Nejsou žádné objednávky</h4>
          ))}
        {data && <OrdersTable orders={data.getOrders.orders} />}
      </div>
      {data?.getOrders.pages > 1 ? (
        <Pagination
          page={page}
          pages={data.getOrders.pages}
          handleClick={handleClick}
        />
      ) : (
        ""
      )}
    </div>
  );
}
