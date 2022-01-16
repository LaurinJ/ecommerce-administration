import { State, Errors } from "../components/form/CategoryForm";

export const validate = (values: State) => {
  const errors: Errors = {};
  if (!values.name) {
    errors.name = "Toto pole je povinné";
  }
  return errors;
};
