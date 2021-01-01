const prod = {
  API_URL: "https://graphql.nam21.com",
};

const dev = {
  API_URL: "http://localhost:4000",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
