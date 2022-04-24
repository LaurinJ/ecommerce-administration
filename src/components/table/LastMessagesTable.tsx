import React from "react";
import { Link } from "react-router-dom";
import { dateStringFormatter } from "../../helpers/dateFormater";

type Messages = {
  _id: string;
  email: string;
  read: boolean;
  content: string;
  createdAt: Date;
};

interface Props {
  messages: Messages[];
}

export const LastMessagesTable: React.FC<Props> = ({ messages }) => {
  return (
    <div className="border-collapse border-gray-200 border">
      {messages ? (
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-lg py-3">Email</th>
              {/* <th className="text-lg py-3">Status</th> */}
              <th className="text-lg py-3">Datum</th>
              <th className="text-lg py-3"></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, i) => (
              <tr
                className={`${
                  message.read ? "" : "font-medium"
                } odd:bg-white even:bg-gray-100 hover:bg-gray-200`}
                key={i}
              >
                <td className="text-center pl-3  py-3">{message.email}</td>
                {/* <td className="text-center px-2 py-3">{"zobrazeno"}</td> */}
                <td className="text-center px-2 py-3">
                  {dateStringFormatter(message.createdAt)}
                </td>
                <td className="text-center px-10 py-3">
                  <Link to={`/message/${message._id}`}>
                    <i
                      className="fa fa-arrow-circle-right fa-lg w-8 hover:text-gray-400 cursor-pointer"
                      aria-hidden="true"
                      title="Přečíst"
                    ></i>
                  </Link>
                  <i
                    className="fa fa-trash fa-lg w-8 hover:text-gray-400 cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <i className="fa fa-search fa-5x py-10 text-gray-200 block text-center items-center"></i>
      )}
    </div>
  );
};
