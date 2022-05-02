import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
//GraphQl
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from
 "@apollo/client";
//Store
import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

 
    <BrowserRouter>
    {/* //Store conection string */}
    <ApolloProvider client={client}>
    <Provider store={store}>
    <App />  
    </Provider>
    </ApolloProvider>
    </BrowserRouter>


  </React.StrictMode>
);

reportWebVitals();