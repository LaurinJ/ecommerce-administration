import React from "react";
import { useQuery } from "@apollo/client";
import { PaymentsTable } from "../components/table/PaymentsTable";
import { Link } from "react-router-dom";
import { GET_PAYMENT_METHODS } from "../queries/Query";
import Loader from "../components/Loader";

function AllPayment() {
  const { loading, error, data } = useQuery(GET_PAYMENT_METHODS);

  return (
    <div className="relative h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-between">
        <h1 className="w-56 text-2xl">Způsob platby</h1>
        <Link to="/add-payment">
          <span className="p-2 bg-blue-300 rounded-sm">
            Přidat způsob platby
          </span>
        </Link>
      </div>
      <div className="mt-5">
        {error && data?.getPaymentMethods.length === 0 && (
          <h4>Nejsou k dispozici žádné způsoby platby</h4>
        )}
        {data && <PaymentsTable payments={data.getPaymentMethods} />}
      </div>
    </div>
  );
}

export default AllPayment;
