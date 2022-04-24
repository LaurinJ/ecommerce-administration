import { Category, CategoryErrors } from "../type/category";

export const validate = (values: Category) => {
  const errors: CategoryErrors = {};
  if (!values.name) {
    errors.name = "Toto pole je povinné";
  }
  return errors;
};
