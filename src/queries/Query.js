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

export const GET_PAYMENT_METHOD = gql`
  query Query($getPaymentMethodId: String) {
    getPaymentMethod(id: $getPaymentMethodId) {
      _id
      name
      hidden
      image
    }
  }
`;

export const GET_PAYMENT_METHODS = gql`
  query Query {
    getPaymentMethods {
      _id
      name
      hidden
    }
  }
`;

export const GET_DELIVERY_METHOD = gql`
  query GetDeliveryMethod($getDeliveryMethodId: String) {
    getDeliveryMethod(id: $getDeliveryMethodId) {
      _id
      name
      price
      hidden
      image
    }
  }
`;

export const GET_DELIVERY_METHODS = gql`
  query GetDeliveryMethod {
    getDeliveryMethods {
      _id
      name
      price
      hidden
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($getMessagesId: String) {
    getMessages(id: $getMessagesId) {
      from
      to
      content
      createdAt
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($getCategoryId: String) {
    getCategory(id: $getCategoryId) {
      hidden
      name
      _id
      slug
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($limit: Int, $skip: Int) {
    getCategories(limit: $limit, skip: $skip) {
      hidden
      name
      _id
    }
  }
`;
