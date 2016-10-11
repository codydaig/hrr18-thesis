import React from 'react';
import ReactDOM from 'react-dom';
import {Router,browserHistory,applyRouterMiddleware} from 'react-router'
import { useScroll } from 'react-router-scroll';
import routes from './routes'
import App from './components/App/App'

import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


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
  <Router history={browserHistory} 
           routes={routes}
           render={applyRouterMiddleware(useScroll())}
           />
           </ApolloProvider>
           ,document.getElementById('app'))

