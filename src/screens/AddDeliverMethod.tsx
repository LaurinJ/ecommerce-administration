import React from "react";
import DeliverForm from "../components/DeliverForm";

function AddDeliverMethod() {
  return (
    <React.Fragment>
      <h1 className="text-2xl">Nový způsob dopravy</h1>
      <div className="mt-5">
        <DeliverForm />
      </div>
    </React.Fragment>
  );
}

export default AddDeliverMethod;
