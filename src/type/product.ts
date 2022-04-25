export type ProductCart = {
  _id: string;
  title: string;
  short_description: string;
  price: number;
  old_price: number;
  count: number;
  img: string;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  short_description: string;
  price: number;
  old_price: number;
  categories: string[];
  code: string;
  countInStock: number;
  hidden: boolean;
  images: any;
};

export interface ProductErrors {
  title?: string;
  price?: string;
  image?: string;
  code?: string;
  short_description?: string;
  countInStock?: string;
  categories?: string;
}
