import { Password, PasswordError } from "../type/password";

export const changePasswordValidator = (values: Password) => {
  const errors: PasswordError = {};
  if (!values.old_password) {
    errors.old_password = "Toto pole je povinné";
  }
  if (!values.password) {
    errors.password = "Toto pole je povinné";
  }
  if (!values.confirm_password) {
    errors.confirm_password = "Toto pole je povinné";
  } else if (values.confirm_password !== values.password) {
    errors.password = "Hesla se neshodují";
    errors.confirm_password = "Hesla se neshodují";
  }
  return errors;
};

export const passwordValidator = (values: Password) => {
  const errors: PasswordError = {};
  if (!values.password) {
    errors.password = "Toto pole je povinné";
  }
  if (!values.confirm_password) {
    errors.confirm_password = "Toto pole je povinné";
  } else if (values.confirm_password !== values.password) {
    errors.password = "Hesla se neshodují";
    errors.confirm_password = "Hesla se neshodují";
  }
  return errors;
};
