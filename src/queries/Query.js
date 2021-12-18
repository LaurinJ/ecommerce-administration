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

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int) {
    getProducts(limit: $limit) {
      title
      price
      countInStock
    }
  }
`;

export const GET_PAYMENT_METHODS = gql`
  query Query {
    getPaymentMethod {
      name
      hidden
    }
  }
`;

export const GET_DELIVERY_METHODS = gql`
  query GetDeliverMethod {
    getDeliverMethod {
      name
      price
      hidden
    }
  }
`;
