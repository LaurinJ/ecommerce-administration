import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { dateStringFormatter } from "../../helpers/dateFormater";
import { useNotification } from "../../context/NotificationProvider";
import DeleteButton from "../DeleteButton";
import Loader from "../Loader";
import { DELETE_CONTACT_MESSAGE } from "../../queries/Mutation";
import { GET_CONTACT_MESSAGES } from "../../queries/Query";

import { Message } from "../../type/message";

interface Props {
  messages: Message[];
}

export const LastMessagesTable: React.FC<Props> = ({ messages }) => {
  const dispatch = useNotification();

  const [deleteMessage, { loading }] = useMutation(DELETE_CONTACT_MESSAGE, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [GET_CONTACT_MESSAGES],
    onCompleted: () => {
      dispatch({
        type: "SUCCESS",
        message: "Zpráva byla odstraněna!",
        title: "Successful Request",
      });
    },
  });

  return (
    <div className="border-collapse border-gray-200 border">
      {messages ? (
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-lg py-3">Email</th>
              <th className="text-lg py-3">Datum</th>
              <th className="text-lg py-3 w-16">Status</th>
              <th className="text-lg py-3"></th>
            </tr>
          </thead>
          <tbody className="relative">
            {loading && <Loader />}
            {messages.map((message, i) => (
              <tr
                className={`${
                  message.read ? "" : "font-medium"
                } odd:bg-white even:bg-gray-100 hover:bg-gray-200`}
                key={i}
              >
                <td className="text-center pl-3  py-3">{message.email}</td>
                <td className="text-center px-2 py-3">
                  {dateStringFormatter(message.createdAt)}
                </td>
                <td className="text-center px-2 py-3">
                  {message.answer ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto text-green-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto text-red-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </td>
                <td className="text-center px-10 py-3">
                  <Link to={`/message/${message._id}`}>
                    <i
                      className="fa fa-arrow-circle-right fa-lg w-8 hover:text-gray-400 cursor-pointer"
                      aria-hidden="true"
                      title="Přečíst"
                    ></i>
                  </Link>
                  <DeleteButton id={message._id} handleDelete={deleteMessage} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center h-40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
