import React from 'react'
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import reactApollo from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
 

class Apollo extends React.Component {
  render () {
    console.log(this)
    return (
      <div>
      <h1> Apollo </h1>
   </div>           
   )
  }
}

const myQuery = gql`query MyQuery {
  users_practs{
    email
    website
  }
}`

const newApollo = graphql(myQuery)(Apollo)

export default newApollo
