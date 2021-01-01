import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { config } from "./constants";

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const httpLink = new HttpLink({ uri: config.API_URL });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});
