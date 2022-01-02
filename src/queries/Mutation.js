import { gql } from "@apollo/client";

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
