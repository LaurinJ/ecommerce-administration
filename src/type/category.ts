export type Category = {
  _id: string;
  name: string;
  image?: string | object;
  hidden: boolean;
};

export type CategoriesQuery = {
  categories: [Category];
  pages: number;
};

export interface CategoryErrors {
  name?: String;
}
