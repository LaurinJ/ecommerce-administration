import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LastMessagesTable } from "../components/table/LastMessagesTable";
import { Link } from "react-router-dom";
import { GET_CONTACT_MESSAGES } from "../queries/Query";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

function ContactMessage() {
  const [page, setPage] = useState<number>(1);
  const [getContactMessage, { loading, error, data }] = useLazyQuery(
    GET_CONTACT_MESSAGES,
    { fetchPolicy: "network-only", variables: { skip: page, limit: 10 } }
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
          <span className="btn">Odeslat zprávu</span>
        </Link>
      </div>
      <div className="screen_container">
        {error && <h4>Nebyli nalezeny zprávy</h4>}
        {loading && <Loader />}
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
