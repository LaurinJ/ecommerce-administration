import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_ORDER } from "../queries/Query";
import { SEND_ORDER, SUSPEND_ORDER, CANCEL_ORDER } from "../queries/Mutation";
import Loader from "../components/Loader";
import { dateStringFormatter } from "../helpers/dateFormater";
import CartItem from "../components/CartItem";
import { ProductCart } from "../type/product";
import { useNotification } from "../context/NotificationProvider";

interface Params {
  orderNumber: string;
}

export default function Order() {
  const dispatch = useNotification();
  const { orderNumber } = useParams<Params>();
  const { loading, data, refetch } = useQuery(GET_ORDER, {
    fetchPolicy: "network-only",
    variables: { orderNumber: orderNumber },
  });

  const [sendOrder, { loading: sendLoading }] = useMutation(SEND_ORDER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      refetch();
      dispatch({
        type: "SUCCESS",
        message: data.sendOrder.message,
        title: "Successful Request",
      });
    },
  });
  const [suspendOrder, { loading: suspendLoading }] = useMutation(
    SUSPEND_ORDER,
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        refetch();
        dispatch({
          type: "SUCCESS",
          message: data.suspendOrder.message,
          title: "Successful Request",
        });
      },
    }
  );
  const [cancelOrder, { loading: cancelLoading }] = useMutation(CANCEL_ORDER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      refetch();
      dispatch({
        type: "SUCCESS",
        message: data.cancelOrder.message,
        title: "Successful Request",
      });
    },
  });

  const order = data?.getOrder;

  return (
    <div className="relative h-screen">
      {(loading || sendLoading || suspendLoading || cancelLoading) && (
        <Loader />
      )}
      {data && (
        <>
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl">Objedn??vka ??.{order.orderNumber}</h1>
            <div className="space-x-2">
              <button
                className="btn"
                onClick={() => {
                  cancelOrder({ variables: { orderNumber: orderNumber } });
                }}
              >
                Stornovat
              </button>
              <button
                className="btn"
                onClick={() => {
                  suspendOrder({ variables: { orderNumber: orderNumber } });
                }}
              >
                Pozastavit
              </button>
              <button
                className="btn"
                onClick={() => {
                  sendOrder({ variables: { orderNumber: orderNumber } });
                }}
              >
                Doru??it
              </button>
            </div>
            <Link to={`/edit-order/${order.orderNumber}`}>
              <span className="btn">Upravit</span>
            </Link>
          </div>
          <div className="mt-5 overflow-hidden">
            {/* order info */}
            <div className="w-full p-4 bg-gray-200">
              <div className="flex flex-wrap justify-between">
                <h3 className="text-xl font-medium">Informace</h3>
                <span>Vytvo??eno: {dateStringFormatter(order.createdAt)}</span>
                <span>Cena: {order.total_price} K??</span>
                <span>Status: {order.state}</span>
              </div>

              {/* Personal information */}
              <div className="flex flex-wrap justify-between">
                <div className="flex flex-col mt-3 md:mt-0">
                  <span className="text-lg font-medium">Osobn?? ??daje</span>
                  <span>
                    {order.person.person_detail.first_name}{" "}
                    {order.person.person_detail.last_name}
                  </span>
                  <span>{order.person.person_detail.email}</span>
                  <span>{order.person.person_detail.phone}</span>
                </div>

                {/* Delivery information */}
                <div className="flex flex-col mt-3 md:mt-0">
                  <span className="text-lg font-medium">Doru??ovac?? ??daje</span>
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
                  <span>??esk?? republika</span>
                </div>

                {/* payment information */}
                <div className="flex flex-col mt-3 md:mt-0">
                  <span className="text-lg font-medium">Zp??sob platby </span>
                  <span>{order.payment_method.name}</span>
                  <span>Zaplacena: {order.is_paid ? "ANO" : "NE"}</span>
                  <span>
                    Datum:{" "}
                    {order.paid_at ? dateStringFormatter(order.paid_at) : "-"}
                  </span>
                </div>

                {/* Way of transportation */}
                <div className="flex flex-col mt-3 md:mt-0">
                  <span className="text-lg font-medium">Zp??sob dopravy </span>
                  <span>
                    {order.deliver_method.name} - {order.deliver_method.price}{" "}
                    K??
                  </span>
                  <span>Doru??ena: {order.is_deliver ? "ANO" : "NE"}</span>
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
              {order.items.map((product: ProductCart, i: KeyType) => {
                return <CartItem key={i} product={product} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
