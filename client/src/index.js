import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {Router,browserHistory} from 'react-router'
import routes from './routes'
const client = new ApolloClient()


ReactDOM.render(
  <ApolloProvider client={client}>
  <Router history={browserHistory} routes={routes}/>
  </ApolloProvider>
  ,document.getElementById('app'))
