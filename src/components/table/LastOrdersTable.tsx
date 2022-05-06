import React from "react";
import { Link } from "react-router-dom";
import { dateStringFormatter } from "../../helpers/dateFormater";

type Order = {
  orderNumber: number;
  is_paid: boolean;
  is_deliver: boolean;
  state: string;
  total_price: number;
  createdAt: Date;
};

interface Props {
  orders: Order[];
}

export const LastOrdersTable: React.FC<Props> = ({ orders }) => {
  return (
    <div className="border-collapse border-gray-200 border">
      {orders ? (
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-lg py-3">Číslo</th>
              <th className="text-lg py-3">Cena</th>
              <th className="text-lg py-3">Datum</th>
              <th className="text-lg py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
                key={i}
              >
                <td className="text-center pl-3  py-3">{order.orderNumber}</td>
                <td className="text-center px-2 py-3">
                  {order.total_price} Kč
                </td>
                <td className="text-center px-2 py-3">
                  {dateStringFormatter(order.createdAt)}
                </td>
                <td className="text-center px-10 py-3">
                  <Link to={`/order/${order.orderNumber}`}>
                    <i
                      className="fa fa-arrow-circle-right fa-lg w-8 hover:text-gray-400 cursor-pointer"
                      aria-hidden="true"
                      title="Podrobnosti"
                    ></i>
                  </Link>
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
