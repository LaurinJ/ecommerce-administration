export type Order = {
  _id: string;
  orderNumber: number;
  is_paid: boolean;
  is_deliver: boolean;
  state: string;
  total_price: number;
  createdAt: Date;
};
