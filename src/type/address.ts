export type Address = {
  email: string;
  first_name: string;
  last_name: string;
  postCode: number;
  village: string;
  street: string;
  numberDescriptive: number;
  phone: number;
};

export type AddressError = {
  email?: string;
  first_name?: string;
  last_name?: string;
  postCode?: string;
  village?: string;
  street?: string;
  numberDescriptive?: string;
  phone?: string;
};
