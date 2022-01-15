import React from "react";
import { useQuery } from "@apollo/client";
import { PaymentsTable } from "../components/PaymentsTable";
import { Link } from "react-router-dom";
import { GET_PAYMENT_METHODS } from "../queries/Query";

function ContactMessage() {
  // const { loading, error, data } = useQuery(GET_PAYMENT_METHODS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error </p>;

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Zpravy</h1>
        <Link to="/add-payment">
          <span className="p-2 bg-blue-300 rounded-sm">
            Přidat způsob platby
          </span>
        </Link>
      </div>
      <div className="mt-5">
        {/* {error && <h4>Nebyli nalezeny</h4>}
        {data && <PaymentsTable payments={data.getPaymentMethod} />} */}
      </div>
    </React.Fragment>
  );
}

export default ContactMessage;
