import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import InputCheck from "../form/InputCheck";
// import { PAYMENT_DELIVERY_METHODS } from "../../queries/Query";
// import { PAYMENT_DELIVERY_MUTATION } from "../../queries/Mutation";
import { getLocalStorage } from "../../actions/auth";

function PaymentForm() {
  // const { data } = useQuery(PAYMENT_DELIVERY_METHODS);
  // const [payment_delivery] = useMutation(PAYMENT_DELIVERY_MUTATION, {
  //   onCompleted: () => {},
  // });
  const [err, setErr] = useState("");
  const data = {};
  const handleChange = (e, _name, price) => {
    const { name, value } = e.target;
    if (name === "payment") {
      // addPayment(value, _name);
    }
    if (name === "delivery") {
      // addDelivery(value, _name, Number(price));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = getLocalStorage("order_token");
      // if (payment.id && delivery.id) {
      //   await payment_delivery({
      //     variables: {
      //       payment: {
      //         _id: payment.id,
      //       },
      //       delivery: {
      //         _id: delivery.id,
      //       },
      //       token: {
      //         token: token,
      //       },
      //     },
      //   });
      // }
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };

  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit}>
        <div className="p-4 shadow-md">
          <span>{err}</span>
          <h3 className="my-7 leading-5 font-bold lg:text-2xl">
            Zvolte způsob platby:
          </h3>
          <div className="w-full">
            {/* payment method */}
            <div className="flex flex-col w-full space-y-6">
              {data
                ? data.getPaymentMethods.map((paymentM) => {
                    return (
                      <InputCheck
                        key={paymentM._id}
                        type="radio"
                        name="payment"
                        label={paymentM.name}
                        value={paymentM._id}
                        img={paymentM.image}
                        // checked={paymentM._id === payment.id}
                        handleChange={handleChange}
                      />
                    );
                  })
                : "loading"}

              {/* <label className="flex justify-between items-center radio w-full px-10 py-1 leading-9 border border-primary  xl:text-[22px]">
                  <input type="radio" value="dhl" name="payment" />
                  Platební karta
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span></span>
                </label> */}
            </div>
          </div>
          <h3 className="my-7 leading-5 font-bold lg:text-2xl">
            Zvolte způsob dopravy:
          </h3>
          <div className="w-full">
            {/* delivery method */}
            <div className="flex flex-col w-full space-y-6">
              {data
                ? data.getDeliveryMethods.map((deliveryM) => {
                    return (
                      <InputCheck
                        key={deliveryM._id}
                        type="radio"
                        name="delivery"
                        label={`${deliveryM.name} - ${deliveryM.price} Kč`}
                        price={deliveryM.price}
                        value={deliveryM._id}
                        img={deliveryM.image}
                        // checked={deliveryM._id === delivery.id}
                        handleChange={handleChange}
                      />
                    );
                  })
                : "loading"}
            </div>
          </div>
        </div>
        {/* button section */}
        <div className="flex flex-col md:flex-row md:justify-end w-full my-8">
          <Link to="/checkout/address">
            <a className="base_btn_form md:mr-4 mb-4 md:mb-0 justify-center">
              ZPĚT K ADRESE
            </a>
          </Link>

          <button
            className="base_btn_form_primary justify-center"
            type="submit"
          >
            POKRAČOVAT NA SHRNUTÍ OBJEDNÁVKY
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
