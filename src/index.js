import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { MyFormProvider } from "./context/myForm";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <MyFormProvider>
        <App />
      </MyFormProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);
