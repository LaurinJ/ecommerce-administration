import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ORDERS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { OrdersTable } from "../components/table/OrdersTable";

export default function AllOrders() {
  const [page, setPage] = useState<number>(1);
  const [search, { loading, data, refetch }] = useLazyQuery(GET_ORDERS, {
    notifyOnNetworkStatusChange: true,
    variables: { skip: page, limit: 10, params: { numberOrder: "" } },
  });

  const handleClick = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="w-56 text-2xl">Seznam objednávek</h1>
        <Search searchFunc={search} />
        <button
          onClick={() => {
            refetch();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      <div className="screen_container">
        {loading && <Loader />}
        {data?.getOrders.orders.length === 0 && (
          <h4 className="mb-3">Nejsou žádné objednávky</h4>
        )}
        {data && <OrdersTable orders={data.getOrders.orders} />}
      </div>
      {data?.getOrders.pages > 1 && (
        <Pagination
          page={page}
          pages={data.getOrders.pages}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}
