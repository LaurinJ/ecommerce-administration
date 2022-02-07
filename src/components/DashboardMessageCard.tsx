import React from "react";
import { useQuery } from "@apollo/client";
import Loader from "./Loader";
import { GET_CONTACT_MESSAGES } from "../queries/Query";
import { LastMessagesTable } from "./table/LastMessagesTable";

function DashboardMessageCard() {
  const { loading, data, refetch } = useQuery(GET_CONTACT_MESSAGES, {
    notifyOnNetworkStatusChange: true,
    variables: { limit: 5 },
  });
  return (
    <div className="w-2/4 p-4 ">
      <div className="flex justify-between p-3 border-2 border-b-0 border-gray-200">
        <h2 className=" font-medium">Poslední zprávy</h2>
        <button
          onClick={() => {
            refetch();
          }}
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className="relative">
        {loading && <Loader />}
        <LastMessagesTable messages={data?.getContactMessages.messages} />
      </div>
    </div>
  );
}

export default DashboardMessageCard;
