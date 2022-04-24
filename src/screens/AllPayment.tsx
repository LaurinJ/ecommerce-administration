import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { PaymentsTable } from "../components/table/PaymentsTable";
import { Link } from "react-router-dom";
import { GET_PAYMENT_METHODS } from "../queries/Query";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

function AllPayment() {
  const [page, setPage] = useState<number>(1);
  const { loading, data } = useQuery(GET_PAYMENT_METHODS, {
    variables: { skip: page },
  });

  const handleClick = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="w-56 text-2xl">Způsob platby</h1>
        <Link to="/add-payment">
          <span className="btn">Přidat způsob platby</span>
        </Link>
      </div>
      <div className="screen_container">
        {loading && <Loader />}

        {data ? (
          <PaymentsTable payments={data.getAllPaymentMethods.methods} />
        ) : (
          <h4>Nejsou k dispozici žádné způsoby platby</h4>
        )}
      </div>
      {data?.getAllPaymentMethods.pages > 1 && (
        <Pagination
          page={page}
          pages={data.getAllPaymentMethods.pages}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default AllPayment;
