import React from 'react'
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient()


export default class Apollo extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
      <div>
    <h1> Apollo </h1>
   </div>           
   )
  }
}



