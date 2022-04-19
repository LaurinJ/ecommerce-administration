export type Password = {
  password: string;
  old_password: string;
  confirm_password: string;
};

export type PasswordError = {
  password?: string;
  old_password?: string;
  confirm_password?: string;
};
