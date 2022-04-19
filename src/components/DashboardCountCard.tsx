import React from "react";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_INFO } from "../queries/Query";
import Loader from "../components/Loader";

function DashboardCountCard() {
  const { data, loading, refetch } = useQuery(GET_DASHBOARD_INFO, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className="relative flex flex-wrap w-full h-24 p-4 text-gray-500">
      {loading && <Loader />}
      <div className="px-3 mb-2 sm:mb-0 relative tile_stats_count">
        <span className="text-sm">
          <i className="fa fa-user mr-1"></i>
          Počet uživatelů
        </span>
        <div className="text-4xl font-bold">{data?.getUsersCount.users}</div>
      </div>
      <div className="px-3 mb-2 sm:mb-0 relative tile_stats_count">
        <span className="text-sm">
          <i className="fa fa-shopping-bag mr-1"></i>
          Počet objednávek
        </span>
        <div className="text-4xl font-bold">{data?.getOrdersCount.orders}</div>
      </div>
      <div className="px-3 mb-2 sm:mb-0 relative tile_stats_count">
        <span className="text-sm">
          <i className="fa fa-dollar mr-1"></i>
          Výdělek za měsíc
        </span>
        <div className="text-4xl font-bold">
          {data?.getOrdersTotal.total} KČ
        </div>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => {
            refetch();
          }}
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default DashboardCountCard;
