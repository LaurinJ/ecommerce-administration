export type Delivery = {
  _id: string;
  name: string;
  price: number;
  image?: string | object;
  hidden: boolean;
};

export type DeliveryQuery = {
  methods: [Delivery];
  pages: number;
};

export interface DeliveryErrors {
  name?: String;
  price?: String;
  image?: String;
}
