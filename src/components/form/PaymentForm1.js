import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import InputCheck from "../form/InputCheck";
import { PAYMENT_DELIVERY_METHODS } from "../../queries/Query";
// import { PAYMENT_DELIVERY_MUTATION } from "../../queries/Mutation";
import { getLocalStorage } from "../../actions/auth";

function PaymentForm({ handleChange, methods, error }) {
  const { data } = useQuery(PAYMENT_DELIVERY_METHODS);

  return (
    <div className=" w-full">
      <form>
        <div className="p-4">
          <h3 className="-7 leading-5 font-bold lg:text-2xl">Způsob platby:</h3>
          <span className="my-2 block lg:text-base xl:text-lg text-red-600">
            {error?.payment}
          </span>
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
                      checked={paymentM._id === methods.payment}
                      handleChange={handleChange}
                    />
                  );
                })
              : "loading"}
          </div>

          <h3 className="mt-7 leading-5 font-bold lg:text-2xl">
            Způsob dopravy:
          </h3>
          <span className="my-2 block lg:text-base xl:text-lg text-red-600">
            {error?.delivery}
          </span>
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
                      checked={deliveryM._id === methods.delivery}
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
