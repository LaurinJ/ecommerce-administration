import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LastMessagesTable } from "../components/table/LastMessagesTable";
import { Link } from "react-router-dom";
import { GET_CONTACT_MESSAGES } from "../queries/Query";
import Pagination from "../components/Pagination";

function ContactMessage() {
  const [page, setPage] = useState(1);
  const [getContactMessage, { loading, error, data }] = useLazyQuery(
    GET_CONTACT_MESSAGES,
    { variables: { skip: page, limit: 10 } }
  );

  const handleClick = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getContactMessage();
  }, []);

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
      {data?.getContactMessages.pages > 1 && (
        <Pagination
          page={page}
          pages={data.getContactMessages.pages}
          handleClick={handleClick}
        />
      )}
    </React.Fragment>
  );
}

export default ContactMessage;
