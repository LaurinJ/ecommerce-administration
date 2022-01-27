import React from "react";
import { Link } from "react-router-dom";

type Person = {};

type PersonDetail = {
  email: string;
  first_name: string;
  last_name: string;
  phone: number;
};

type Order = {
  orderNumber: number;
  is_paid: boolean;
  is_deliver: boolean;
  state: string;
  price: number;
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
          <th className="text-lg w-1/5 py-3">Jméno</th>
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
            <td className=" text-center px-10 py-3">{"Karel Kopal"}</td>
            <td className="text-center px-10 py-3">{order.price} Kč</td>
            <td className=" text-center px-10 py-3">{"24.11.2021"}</td>
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
