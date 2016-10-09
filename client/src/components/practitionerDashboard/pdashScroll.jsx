import React from 'react'
import pdashMain from './pdashMain'
import { ScrollContainer } from 'react-router-scroll';
import reactApollo from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class pdashScrollComp extends React.Component {
  render () {
    return(
      <pdashMain/>
       )
  }
}
 



const getAll = gql`query getApointments {
  users_pract(id:"${localStorage.user_id}") {
    appointments {
      clientname
      practname
      meeting_id
      client_id
      pract_id
      date_time
   }
    user_metadata{
      firstName
      lastName
    }
   }
}`

const pdashScroll = graphql(getAll,{
  options:{pollInterval:200}
})(pdashScrollComp)

export default pdashScroll