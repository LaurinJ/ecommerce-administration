import { Payment, PaymentErrors } from "../type/payment";

export const validate = (values: Payment) => {
  const errors: PaymentErrors = {};
  if (!values.name) {
    errors.name = "Toto pole je povinné";
  }
  return errors;
};
