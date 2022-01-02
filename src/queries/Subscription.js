import { gql } from "@apollo/client";

export const MESSAGES_SUBSCRIPTION = gql`
  subscription Subscription {
    shareMessage {
      from
      to
      content
      createdAt
    }
  }
`;
