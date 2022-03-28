import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {AppFunctional} from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: 'include'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppFunctional />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
