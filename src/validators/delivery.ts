import { Delivery, DeliveryErrors } from "../type/delivery";

export const validate = (values: Delivery) => {
  const errors: DeliveryErrors = {};
  if (!values.name) {
    errors.name = "Toto pole je povinné";
  }
  if (!values.price) {
    errors.price = "Toto pole je povinné";
  }
  return errors;
};
