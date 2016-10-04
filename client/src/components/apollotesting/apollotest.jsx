import React from 'react'
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider, withApollo } from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
 

class Apollo extends React.Component {
  render () {
    return (
      <div>
      <h1> Apollo </h1>
   </div>           
   )
  }
}

const newApollo = graphql(gql`
 query getAll {
    users_practs {
      user_metadata {firstName lastName }
    }
  }
`)(Apollo)


export{newApollo}


