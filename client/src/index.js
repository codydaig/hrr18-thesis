import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {Router,browserHistory} from 'react-router'
import routes from './routes'
import App from './components/App/App'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  networkInterface : createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin',
    }
  },
    {
      shouldBatch: true,
      initialState: window.__APOLLO_STATE__
    }
  )
})


ReactDOM.render(
  <ApolloProvider client={client}>
  <Router history={browserHistory} routes={routes}/>
  </ApolloProvider>
  ,document.getElementById('app'))

