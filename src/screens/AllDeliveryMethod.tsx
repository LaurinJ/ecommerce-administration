import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { DeliveryTable } from "../components/table/DeliveryTable";
import { Link } from "react-router-dom";
import { GET_DELIVERY_METHODS } from "../queries/Query";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

function AllDeliveryMethod() {
  const [page, setPage] = useState<number>(1);
  const { loading, data } = useQuery(GET_DELIVERY_METHODS, {
    fetchPolicy: "network-only",
    variables: { skip: page },
  });

  const handleClick = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="w-56 text-2xl">Způsob dopravy</h1>
        <Link to="/add-delivery">
          <span className="btn">Přidat způsob dopravy</span>
        </Link>
      </div>
      <div className="screen_container">
        {loading && <Loader />}
        {data ? (
          <DeliveryTable deliveries={data.getAllDeliveryMethods.methods} />
        ) : (
          "Nejsou k dispozici žádné způsoby dopravy"
        )}
      </div>
      {data?.getAllDeliveryMethods.pages > 1 && (
        <Pagination
          page={page}
          pages={data.getAllDeliveryMethods.pages}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default AllDeliveryMethod;
