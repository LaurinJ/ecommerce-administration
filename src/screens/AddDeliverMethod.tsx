import React from "react";
import PaymentForm from "../components/PaymentForm";

function AddDeliverMethod() {
  return (
    <React.Fragment>
      <h1 className="text-2xl">Nový způsob dopravy</h1>
      <div className="mt-5">
        <PaymentForm />
      </div>
    </React.Fragment>
  );
}

export default AddDeliverMethod;
