import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query GetProducts($skip: Int) {
    getProducts(skip: $skip) {
      title
      price
      old_price
      slug
      description
      imgurl
      rating
      rating_sum
    }
    getCountPages {
      pages
    }
  }
`;
