import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    getProduct(slug: $slug) {
      _id
      title
      slug
      description
      short_description
      code
      price
      old_price
      countInStock
      categories {
        _id
        # name
      }
      images
      # imgurl
      # hidden
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int) {
    getProducts(limit: $limit) {
      _id
      title
      price
      slug
      countInStock
    }
  }
`;

// export const SEARCH = gql`
//   query GetFilterProducts($params: FilterData, $limit: Int, $skip: Int) {
//     getFilterProducts(params: $params, skip: $skip, limit: $limit) {
//       title
//       slug
//       price
//       countInStock
//     }
//   }
// `;

export const SEARCH = gql`
  query GetFilterProducts($params: FilterData, $limit: Int, $skip: Int) {
    getFilterProducts(params: $params, skip: $skip, limit: $limit) {
      products {
        title
        slug
        price
        countInStock
      }
      pages
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
