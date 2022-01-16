import React from "react";
import { useParams } from "react-router-dom";
import DeliveryForm from "../components/form/DeliveryForm";

type DeliveryId = {
  id: string;
};

function AddDeliveryMethod() {
  const { id } = useParams<DeliveryId>();

  return (
    <React.Fragment>
      <h1 className="text-2xl">Nový způsob dopravy</h1>
      <div className="mt-5">
        <DeliveryForm id={id} />
      </div>
    </React.Fragment>
  );
}

export default AddDeliveryMethod;
