import { Product, ProductErrors } from "../type/product";

export const validate = (values: Product) => {
  const errors: ProductErrors = {};
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
