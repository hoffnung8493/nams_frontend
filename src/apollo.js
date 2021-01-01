import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { config } from "./constants";
import { onError } from "@apollo/client/link/error";

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    if (
      graphQLErrors.includes((err) => err.message.includes("invalid signature"))
    ) {
      localStorage.clear();
      client.cache.reset();
      console.warn("invalid token signature - forced logout");
    }
  }
});

const httpLink = new HttpLink({ uri: config.API_URL });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, httpLink]),
  shouldBatch: true,
});
