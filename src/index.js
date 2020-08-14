import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, ApolloClient } from '@apollo/client';

const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  console.log('DEVELOPMENT');
}

const cache = new InMemoryCache();
const graphqlEndpoint = isDev
  ? 'http://localhost:4000'
  : 'https://ferguson-sourcing-windows.azurewebsites.net';
const link = new HttpLink({
  uri: `${graphqlEndpoint}/graphql`,
});

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
