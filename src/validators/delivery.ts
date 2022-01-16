import { State, Errors } from "../components/form/DeliveryForm";
export const validate = (values: State) => {
  const errors: Errors = {};
  if (!values.name) {
    errors.name = "Toto pole je povinné";
  }
  if (!values.price) {
    errors.price = "Toto pole je povinné";
  }
  return errors;
};
