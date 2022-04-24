export type Payment = {
  _id: string;
  name: string;
  image?: string | object;
  hidden: boolean;
};

export type PaymentQuery = {
  methods: [Payment];
  pages: number;
};

export interface PaymentErrors {
  name?: String;
}
