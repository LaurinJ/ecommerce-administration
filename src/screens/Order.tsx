import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_ORDER } from "../queries/Query";
import Loader from "../components/Loader";
import { dateStringFormatter } from "../helpers/dateFormater";
import CartItem from "../components/CartItem";

interface Params {
  orderNumber: string;
}

type Product = {
  _id?: string;
  title: string;
  short_description: string;
  price: number;
  old_price: number;
  count: number;
  img: string;
};

export default function Order() {
  const { orderNumber } = useParams<Params>();
  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { orderNumber: orderNumber },
  });

  useEffect(() => {}, []);

  const order = data?.getOrder;

  return (
    <div className="relative h-screen">
      {loading && <Loader />}
      {data && (
        <>
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl">Objednávka č.{order.orderNumber}</h1>
            <div></div>
            <Link to={`/edit-order/${order.orderNumber}`}>
              <span className="p-2 bg-blue-300 rounded-sm">Upravit</span>
            </Link>
          </div>
          <div className="mt-5 overflow-hidden">
            {/* order info */}
            <div className="w-full p-4 bg-gray-200">
              <div className="flex flex-wrap justify-between">
                <h3 className="text-xl font-medium">Informace</h3>
                <span>Vytvořeno: {dateStringFormatter(order.createdAt)}</span>
                <span>Cena: {order.total_price} Kč</span>
                <span>Status: {order.state}</span>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="flex flex-col mt-3 md:mt-0">
                  <span className="text-lg font-medium">Osobní údaje</span>
                  <span>
                    {order.person.person_detail.first_name}{" "}
                    {order.person.person_detail.last_name}
                  </span>
                  <span>{order.person.person_detail.email}</span>
                  <span>{order.person.person_detail.phone}</span>
                </div>

                <div className="flex flex-col mt-3 md:mt-0">
                  <span className="text-lg font-medium">Doručovací údaje</span>
                  <span>
                    {order.person.person_detail.first_name}{" "}
                    {order.person.person_detail.last_name}
                  </span>
                  <span>
                    {order.person.address.street}{" "}
                    {order.person.address.numberDescriptive}
                  </span>
                  <span>
                    {order.person.address.postCode}{" "}
                    {order.person.address.village}
                  </span>
                  <span>Česká republika</span>
                </div>
                <div className="flex flex-col mt-3 md:mt-0">
                  <span className="text-lg font-medium">Způsob platby </span>
                  <span>{order.payment_method.name}</span>
                  <span>Zaplacena: {order.is_paid ? "ANO" : "NE"}</span>
                  <span>
                    Datum:{" "}
                    {order.paid_at ? dateStringFormatter(order.paid_at) : "-"}
                  </span>
                </div>
                <div className="flex flex-col mt-3 md:mt-0">
                  <span className="text-lg font-medium">Způsob dopravy </span>
                  <span>
                    {order.deliver_method.name} - {order.deliver_method.price}{" "}
                    Kč
                  </span>
                  <span>Doručena: {order.is_deliver ? "ANO" : "NE"}</span>
                  <span>
                    Datum:{" "}
                    {order.delivered_at
                      ? dateStringFormatter(order.delivered_at)
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
            {/* products list */}
            <div className="m-4">
              {order.items.map((product: Product, i: KeyType) => {
                return <CartItem key={i} product={product} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
