import { State, Errors } from "../components/form/ProductForm";

export const validate = (values: State) => {
  const errors: Errors = {};
  if (!values.title) {
    errors.title = "Toto pole je povinné";
  }
  if (!values.short_description) {
    errors.short_description = "Toto pole je povinné";
  }
  if (!values.price) {
    errors.price = "Toto pole je povinné";
  }
  if (!values.images) {
    errors.image = "Toto pole je povinné";
  }
  if (!values.code) {
    errors.code = "Toto pole je povinné";
  }
  return errors;
};
