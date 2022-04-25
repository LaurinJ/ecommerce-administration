import { useHistory } from "react-router-dom";
import { ApolloClient, InMemoryCache, split, makeVar } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getCookie, getLocalStorage } from "./actions/auth";
import { ProductCart } from "./type/product";
import { onError } from "@apollo/client/link/error";
import { User } from "./type/user";

let httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // const history = useHistory();
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message.includes("Nejsi přihlášený/ná")) {
        // history.push("/account/login");
      }
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // // get the authentication token from local storage if it exists
  const token = getCookie("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

httpLink = errorLink.concat(authLink.concat(httpLink));

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      // authorization: `Bearer ${getCookie("accessToken")}`,
      chatid: getLocalStorage("chatId"),
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
  cache: new InMemoryCache({
    addTypename: false,
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       getFilterProducts: {
    //         // ...offsetLimitPagination(),
    //         read(existing, { args }) {
    //           const page = (args.skip - 1) * 12;
    //           console.log(args);
    //           // A read function should always return undefined if existing is
    //           // undefined. Returning undefined signals that the field is
    //           // missing from the cache, which instructs Apollo Client to
    //           // fetch its value from your GraphQL server.
    //           return (
    //             existing && existing?.products.slice(page, page + args.limit)
    //           );
    //         },
    //         merge(existing = {}, incoming) {
    //           const list = existing?.products
    //             ? [...existing.products, ...incoming.products]
    //             : [...incoming.products];
    //           return { ...incoming, products: list };
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});

export const userData = makeVar<User>({
  email: "",
  name: "",
  profile: { profile_image: "" },
});
export const orderCart = makeVar<ProductCart[]>([]);
