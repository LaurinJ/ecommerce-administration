import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
  }),
  // uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
