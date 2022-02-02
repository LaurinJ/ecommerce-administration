export type Product = {
  _id: string;
  title: string;
  short_description: string;
  price: number;
  old_price: number;
  count: number;
  img: string;
};

export interface PropsProducts {
  product: Product;
}
