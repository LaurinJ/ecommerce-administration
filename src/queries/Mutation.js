import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($user: userLoginData!) {
    login(user: $user) {
      accessToken
      refreshToken
      user {
        name
        email
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout($token: RefreshToken!) {
    logout(token: $token) {
      status
    }
  }
`;

export const CREATE_PAYMENT_METHOD = gql`
  mutation Mutation($payment: PaymentData!, $image: Upload) {
    createPayment(payment: $payment, image: $image) {
      name
    }
  }
`;

export const CREATE_DELIVER_METHOD = gql`
  mutation CreateDeliverMethod($deliver: DeliverData!, $image: Upload) {
    createDeliverMethod(deliver: $deliver, image: $image) {
      name
      price
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation Mutation($message: MessageData!) {
    sendMessage(message: $message) {
      to
    }
  }
`;

export const SET_ADMIN_TOKEN = gql`
  mutation Mutation($token: String!) {
    setAdminToken(token: $token) {
      token
    }
  }
`;
export const DELETE_ADMIN_TOKEN = gql`
  mutation Mutation($token: String!) {
    deleteAdminToken(token: $token) {
      token
    }
  }
`;
