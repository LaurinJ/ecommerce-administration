import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getCookie, getLocalStorage } from "./actions/auth";

let httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const token = getCookie("accessToken");
const chatId = getLocalStorage("chatId");

const authLink = setContext((_, { headers }) => {
  // // get the authentication token from local storage if it exists
  // const token = getCookie("accessToken");
  // const chatId = getLocalStorage("chatId");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      chatid: chatId ? chatId : "",
    },
  };
});

httpLink = authLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      authorization: `Bearer ${token}`,
      chatid: "admin",
      // chatid: chatId,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
