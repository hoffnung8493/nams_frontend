import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { MyFormProvider } from "./context/myForm";
import { PeerFormProvider } from "./context/peerForm";
import { AppMenuProvider } from "./context/AppMenu";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <PeerFormProvider>
        <MyFormProvider>
          <AppMenuProvider>
            <App />
          </AppMenuProvider>
        </MyFormProvider>
      </PeerFormProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);
