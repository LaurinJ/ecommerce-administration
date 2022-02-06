import React from "react";
import { useQuery } from "@apollo/client";
import { LastOrdersTable } from "./table/LastOrdersTable";
import Loader from "./Loader";
import { GET_ORDERS } from "../queries/Query";

function DashboardOrderCard() {
  const { loading, data, refetch } = useQuery(GET_ORDERS, {
    notifyOnNetworkStatusChange: true,
    variables: { limit: 10, params: { numberOrder: "" } },
  });

  return (
    <div className="w-2/4 p-4 ">
      <div className="flex justify-between p-3 border-2 border-b-0 border-gray-200">
        <h2 className=" font-medium">Poslední objednávky</h2>
        <button
          onClick={() => {
            refetch();
          }}
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className="relative">
        {loading && <Loader />}
        <LastOrdersTable orders={data?.getOrders.orders} />
      </div>
    </div>
  );
}

export default DashboardOrderCard;
