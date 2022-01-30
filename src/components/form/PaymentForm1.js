import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import InputCheck from "../form/InputCheck";
import { PAYMENT_DELIVERY_METHODS } from "../../queries/Query";
// import { PAYMENT_DELIVERY_MUTATION } from "../../queries/Mutation";
import { getLocalStorage } from "../../actions/auth";

function PaymentForm({ handleChange }) {
  const { data } = useQuery(PAYMENT_DELIVERY_METHODS);
  const [err, setErr] = useState("");

  return (
    <div className=" w-full">
      <form>
        <div className="p-4">
          <span>{err}</span>
          <h3 className="mb-7 leading-5 font-bold lg:text-2xl">
            Způsob platby:
          </h3>
          {/* payment method */}
          <div className="flex flex-col w-full space-y-6">
            {data
              ? data.getPaymentMethods.map((paymentM, i) => {
                  return (
                    <InputCheck
                      key={paymentM._id}
                      type="radio"
                      name="payment"
                      label={paymentM.name}
                      value={paymentM._id}
                      img={paymentM.image}
                      // checked={paymentM._id === payment.id}
                      checked={i === 2}
                      handleChange={handleChange}
                    />
                  );
                })
              : "loading"}
          </div>

          <h3 className="my-7 leading-5 font-bold lg:text-2xl">
            Způsob dopravy:
          </h3>
          {/* delivery method */}
          <div className="flex flex-col w-full space-y-6">
            {data
              ? data.getDeliveryMethods.map((deliveryM, i) => {
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
                      checked={i === 1}
                      handleChange={handleChange}
                    />
                  );
                })
              : "loading"}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
