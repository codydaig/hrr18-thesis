import React from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from '../Header/Header'
import Foot from '../Footer/Footer'
import Main from '../Main/Main'
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Infinite from 'react-infinite'

export default class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Header/>
           
         
           {this.props.children}
                   
           <Foot />
        </div>
      </MuiThemeProvider>
     )
  }
}


