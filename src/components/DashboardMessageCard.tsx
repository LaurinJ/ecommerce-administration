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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
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
