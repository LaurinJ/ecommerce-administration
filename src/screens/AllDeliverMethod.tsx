import React from "react";
import { useQuery } from "@apollo/client";
import { DeliverTable } from "../components/DeliverTable";
import { Link } from "react-router-dom";
import { GET_DELIVERY_METHODS } from "../queries/Query";
import Loader from "../components/Loader";

function AllDeliverMethod() {
  const { loading, error, data } = useQuery(GET_DELIVERY_METHODS);

  return (
    <div className="relative h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Způsob dopravy</h1>
        <Link to="/add-deliver">
          <span className="p-2 bg-blue-300 rounded-sm">
            Přidat způsob dopravy
          </span>
        </Link>
      </div>
      <div className="mt-5">
        {data ? (
          <DeliverTable delivers={data.getDeliveryMethod} />
        ) : (
          "Nejsou k dispozici žádné způsoby platby"
        )}
      </div>
    </div>
  );
}

export default AllDeliverMethod;
