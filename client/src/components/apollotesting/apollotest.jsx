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

  componentDidMount () {
    const MyQuery = gql`query MyQuery {users_practs{user_metadata{firstName lastName }}}`
   // const ApolloClient = graphql(MyQuery)(ApolloClient)
    console.log(MyQuery)
  }




  render () {
    return (
      <div>
    <h1> Apollo </h1>
   </div>           
   )
  }
}



