import React from "react";
import { useParams } from "react-router-dom";
import PaymentForm from "../components/form/PaymentForm";

type PaymentId = {
  id: string;
};

function AddPayment() {
  const { id } = useParams<PaymentId>();
  return (
    <React.Fragment>
      <h1 className="text-2xl">Nový způsob platby</h1>
      <div className="mt-5">
        <PaymentForm id={id} />
      </div>
    </React.Fragment>
  );
}

export default AddPayment;
