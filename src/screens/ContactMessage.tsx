import React from "react";
import { useQuery } from "@apollo/client";
import { LastMessagesTable } from "../components/table/LastMessagesTable";
import { Link } from "react-router-dom";
import { GET_CONTACT_MESSAGES } from "../queries/Query";

function ContactMessage() {
  const { loading, error, data } = useQuery(GET_CONTACT_MESSAGES);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error </p>;

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Zpravy</h1>
        <Link to="/add-payment">
          <span className="p-2 bg-blue-300 rounded-sm">Odeslat zprávu</span>
        </Link>
      </div>
      <div className="mt-5">
        {error && <h4>Nebyli nalezeny zprávy</h4>}
        {data && (
          <LastMessagesTable messages={data.getContactMessages.messages} />
        )}
      </div>
    </React.Fragment>
  );
}

export default ContactMessage;
