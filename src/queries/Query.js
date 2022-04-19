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
  query GetPaymentMethod($getPaymentMethodId: String) {
    getPaymentMethod(id: $getPaymentMethodId) {
      _id
      name
      hidden
      image
    }
  }
`;

export const GET_PAYMENT_METHODS = gql`
  query GetAllPaymentMethods($limit: Int, $skip: Int) {
    getAllPaymentMethods(limit: $limit, skip: $skip) {
      methods {
        _id
        name
        hidden
      }
      pages
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
  query getAllDeliveryMethods($limit: Int, $skip: Int) {
    getAllDeliveryMethods(limit: $limit, skip: $skip) {
      methods {
        _id
        name
        price
        hidden
      }
      pages
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
  query GetAllCategories($limit: Int, $skip: Int) {
    getAllCategories(limit: $limit, skip: $skip) {
      categories {
        hidden
        name
        _id
      }
      pages
    }
  }
`;

export const PAYMENT_DELIVERY_METHODS = gql`
  query GetPaymentDeliveryMethod {
    getPaymentMethods {
      _id
      name
      image
    }
    getDeliveryMethods {
      _id
      name
      image
      price
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($orderNumber: String) {
    getOrder(orderNumber: $orderNumber) {
      items {
        _id
        title
        price
        old_price
        count
        img
        short_description
      }
      total_price
      person {
        person_detail {
          first_name
          last_name
          phone
          email
        }
        address {
          street
          village
          postCode
          numberDescriptive
        }
      }
      state
      orderNumber
      is_paid
      paid_at
      is_deliver
      delivered_at
      createdAt
      deliver_method {
        _id
        price
        name
      }
      payment_method {
        _id
        name
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($params: FilterOrderData, $limit: Int, $skip: Int) {
    getOrders(params: $params, limit: $limit, skip: $skip) {
      orders {
        total_price
        state
        is_paid
        is_deliver
        orderNumber
        createdAt
      }
      pages
    }
  }
`;

export const GET_CONTACT_MESSAGES = gql`
  query Query($skip: Int, $limit: Int) {
    getContactMessages(skip: $skip, limit: $limit) {
      pages
      messages {
        _id
        email
        read
        createdAt
        content
      }
    }
  }
`;

export const GET_CONTACT_MESSAGE = gql`
  query GetContactMessage($getContactMessageId: String!) {
    getContactMessage(id: $getContactMessageId) {
      _id
      email
      content
      read
      answer
      createdAt
    }
  }
`;
export const GET_CONTACT_MESSAGE_COUNT = gql`
  query GetContactMessagesCount {
    getContactMessagesCount {
      messages
    }
  }
`;

export const GET_DASHBOARD_INFO = gql`
  query GetDashboardInfo {
    getOrdersTotal {
      total
    }
    getOrdersCount {
      orders
    }
    getUsersCount {
      users
    }
  }
`;
