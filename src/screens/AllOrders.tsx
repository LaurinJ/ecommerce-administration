import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ORDERS } from "../queries/Query";
import Loader from "../components/Loader";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { OrdersTable } from "../components/table/OrdersTable";

export default function AllOrders() {
  const [page, setPage] = useState<number>(1);
  const [search, { loading, error, data, refetch }] = useLazyQuery(GET_ORDERS, {
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
        <Search searchFunc={search} page={page} />
        <button
          onClick={() => {
            refetch();
          }}
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className="screen_container">
        {loading && <Loader />}
        {error ||
          (data?.getOrders.orders.length === 0 && (
            <h4 className="mb-3">Nejsou žádné objednávky</h4>
          ))}
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
