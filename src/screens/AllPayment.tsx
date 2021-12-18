import React from "react";
import { useQuery, gql } from "@apollo/client";
import { PaymentsTable } from "../components/PaymentsTable";
import { Link } from "react-router-dom";

const GET_PAYMENTS = gql`
  query Query {
    getPaymentMethod {
      name
      hidden
    }
  }
`;

function AllPayment() {
  const { loading, error, data } = useQuery(GET_PAYMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Způsob platby</h1>
        <Link to="/add-payment">
          <span className="p-2 bg-blue-300 rounded-sm">
            Přidat způsob platby
          </span>
        </Link>
      </div>
      <div className="mt-5">
        <PaymentsTable payments={data.getPaymentMethod} />
      </div>
    </React.Fragment>
  );
}

export default AllPayment;
