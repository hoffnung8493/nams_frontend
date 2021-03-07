import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { MyFormProvider } from "./context/myForm";
import { PeerFormProvider } from "./context/peerForm";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <PeerFormProvider>
        <MyFormProvider>
          <App />
        </MyFormProvider>
      </PeerFormProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);
