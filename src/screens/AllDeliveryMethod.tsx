import React from "react";
import { useQuery } from "@apollo/client";
import { DeliveryTable } from "../components/table/DeliveryTable";
import { Link } from "react-router-dom";
import { GET_DELIVERY_METHODS } from "../queries/Query";
import Loader from "../components/Loader";

function AllDeliveryMethod() {
  const { loading, error, data } = useQuery(GET_DELIVERY_METHODS);

  return (
    <div className="relative h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-between">
        <h1 className="w-56 text-2xl">Způsob dopravy</h1>
        <Link to="/add-delivery">
          <span className="p-2 bg-blue-300 rounded-sm">
            Přidat způsob dopravy
          </span>
        </Link>
      </div>
      <div className="mt-5">
        {data ? (
          <DeliveryTable deliveries={data.getDeliveryMethods} />
        ) : (
          "Nejsou k dispozici žádné způsoby dopravy"
        )}
      </div>
    </div>
  );
}

export default AllDeliveryMethod;
