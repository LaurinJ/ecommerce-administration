import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useReactiveVar,
  ApolloError,
} from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { GET_ORDER } from "../queries/Query";
import Loader from "../components/Loader";
import { dateStringFormatter } from "../helpers/dateFormater";
import CartEditItem from "../components/CartEditItem";
import AddressForm from "../components/form/AddressForm";
import PaymentForm from "../components/form/PaymentForm1";
import { orderCart } from "../apollo-client";
import { Address } from "../type/address";
import { validate } from "../validators/address";
import { EDIT_ORDER } from "../queries/Mutation";
import { getTotalPrice } from "../actions/cart";

interface Params {
  orderNumber: string;
}

export default function EditOrder() {
  const cart = useReactiveVar(orderCart);
  const history = useHistory();
  const [methods, setMethods] = useState({ payment: "", delivery: "" });
  const [formValues, setFormValues] = useState<Address>({
    email: "",
    first_name: "",
    last_name: "",
    postCode: 0,
    village: "",
    street: "",
    numberDescriptive: 0,
    phone: 0,
  });
  const [err, setErr] = useState({});

  const { orderNumber } = useParams<Params>();
  const { loading, data } = useQuery(GET_ORDER, {
    variables: { orderNumber: orderNumber },
    onCompleted: (data) => {
      const order = data.getOrder;
      setFormValues({ ...order.person.address, ...order.person.person_detail });
      setMethods({
        payment: order.payment_method._id,
        delivery: order.deliver_method._id,
      });
      orderCart(order.items);
    },
  });
  const [editOrder, { loading: editLoading, error }] = useMutation(EDIT_ORDER, {
    onCompleted: () => {
      history.push(`/order/${orderNumber}`);
    },
  });

  const methodsHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "payment") {
      setMethods({ ...methods, [name]: value });
    }
    if (name === "delivery") {
      setMethods({ ...methods, [name]: value });
    }
  };

  const addresshandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const errors = validate(formValues);
      setErr(errors);
      if (Object.keys(errors).length === 0) {
        console.log(cart);

        const total_price = getTotalPrice();
        await editOrder({
          variables: {
            orderNumber: orderNumber,
            order: {
              payment: methods.payment,
              delivery: methods.delivery,
              total_price: total_price,
              items: cart,
            },
            person: {
              email: formValues.email,
              first_name: formValues.first_name,
              last_name: formValues.last_name,
              phone: Number(formValues.phone),
            },
            address: {
              village: formValues.village,
              street: formValues.street,
              postCode: Number(formValues.postCode),
              numberDescriptive: Number(formValues.numberDescriptive),
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        setErr(error.graphQLErrors[0].extensions.errors);
      }
    }
  };

  const order = data?.getOrder;

  return (
    <div className="relative h-screen">
      {(loading || editLoading) && <Loader />}
      {data && (
        <>
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl">Objednávka č.{order.orderNumber}</h1>

            <button
              className="p-2 bg-blue-300 rounded-sm"
              onClick={handleSubmit}
            >
              Uložit
            </button>
          </div>
          <div className="mt-5 overflow-hidden">
            <div className="flex">
              <div className="w-2/4">
                <AddressForm
                  formValues={formValues}
                  error={err}
                  handleChange={addresshandleChange}
                />
              </div>
              <div className="w-2/4">
                <PaymentForm
                  handleChange={methodsHandleChange}
                  error={err}
                  methods={methods}
                />
              </div>
            </div>

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
              {cart.map((product: any, i) => {
                return <CartEditItem key={i} product={product} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
