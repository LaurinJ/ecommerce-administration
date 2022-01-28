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
  orders: [Order];
}

export const OrdersTable: React.FC<Props> = ({ orders }) => {
  return (
    <table className="w-full table-fixed border-collapse border-gray-200 border">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-lg w-1/5 py-3">Číslo</th>
          <th className="text-lg w-1/5 py-3">Zaplacena</th>
          <th className="text-lg w-1/5 py-3">Doručena</th>
          <th className="text-lg w-1/5 py-3">Cena</th>
          <th className="text-lg w-1/5 py-3">Datum</th>
          <th className="text-lg w-1/5 py-3">Stav</th>
          <th className="text-lg w-1/5 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => (
          <tr
            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
            key={i}
          >
            <td className="text-center pl-3  py-3">{order.orderNumber}</td>
            <td className=" text-center px-10 py-3">
              {order.is_paid ? (
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
            <td className=" text-center px-10 py-3">
              {order.is_deliver ? (
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
            <td className="text-center px-10 py-3">{order.total_price} Kč</td>
            <td className=" text-center px-10 py-3">
              {dateStringFormatter(order.createdAt)}
              {order.createdAt}
            </td>
            <td className=" text-center px-10 py-3">{order.state}</td>
            <td className=" text-center px-10 py-3">
              <Link to={`/edit-order/${order.orderNumber}`}>
                <i
                  className="fa fa-pencil fa-lg w-8 hover:text-gray-400 cursor-pointer"
                  aria-hidden="true"
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
  );
};
