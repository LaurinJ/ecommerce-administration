import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { LastMessagesTable } from "../components/table/LastMessagesTable";
import { GET_CONTACT_MESSAGES } from "../queries/Query";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

function ContactMessage() {
  const [page, setPage] = useState<number>(1);

  const { loading, error, data } = useQuery(GET_CONTACT_MESSAGES, {
    variables: { skip: page, limit: 10 },
  });

  const handleClick = (page: number) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Zpravy</h1>
      </div>
      <div className="screen_container">
        {error && <h4>Nebyly nalezeny žádné zprávy</h4>}
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
