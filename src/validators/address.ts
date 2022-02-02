import { Address, AddressError } from "../type/address";

export const validate = (values: Address) => {
  const errors: AddressError = {};
  const regex = /^[a-zA-Z]+$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.email) {
    errors.email = "Toto pole je povinné";
  } else if (!regexEmail.test(values.email)) {
    errors.email = "Email je ve špatném formátu";
  }
  if (!values.first_name) {
    errors.first_name = "Toto pole je povinné";
  } else if (!regex.test(values.first_name)) {
    errors.first_name = "Jméno je ve špatném formátu";
  }
  if (!values.last_name) {
    errors.last_name = "Toto pole je povinné";
  } else if (!regex.test(values.last_name)) {
    errors.last_name = "Přijmení je ve špatném formátu";
  }
  if (!values.postCode) {
    errors.postCode = "Toto pole je povinné";
  }
  if (!values.village) {
    errors.village = "Toto pole je povinné";
  }
  if (!values.street) {
    errors.street = "Toto pole je povinné";
  }
  if (!values.numberDescriptive) {
    errors.numberDescriptive = "Toto pole je povinné";
  }
  if (!values.phone) {
    errors.phone = "Toto pole je povinné";
  }
  return errors;
};
