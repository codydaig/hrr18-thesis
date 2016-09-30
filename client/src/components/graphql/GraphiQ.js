import React from 'react'
import GraphiQL from 'graphiql';
import {cyan200,grey800,pinkA100} from 'material-ui/styles/colors'
import { Footer, FooterSection, FooterLinkList } from 'react-mdl'
import fetch from 'isomorphic-fetch';

function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}


export default class GraphiQ extends React.Component {

constructor(props) {
    super(props)
    this.state = {
      // REQUIRED:
      // `fetcher` must be provided in order for GraphiQL to operate
      fetcher: this.props.fetcher,

      // OPTIONAL PARAMETERS
      // GraphQL artifacts
      query: '',
      variables: '',
      response: '',

      // GraphQL Schema
      // If `undefined` is provided, an introspection query is executed
      // using the fetcher.
      schema: undefined,


      // Useful to determine which operation to run
      // when there are multiple of them.
      operationName: null,
      storage: null,
      defaultQuery: null,

      // Custom Event Handlers
      onEditQuery: null,
      onEditVariables: null,
      onEditOperationName: null,

      // GraphiQL automatically fills in leaf nodes when the query
      // does not provide them. Change this if your GraphQL Definitions
      // should behave differently than what's defined here:
      // (https://github.com/graphql/graphiql/blob/master/src/utility/fillLeafs.js#L75)
      getDefaultFieldNames: null
    };
  }

  _onClickToolbarButton(event) {
    alert('Clicked toolbar button!');
  }



  render () {
    return (
      <GraphiQL fetcher={this.state.fetcher}>
        <GraphiQL.Logo>
          Custom Logo
        </GraphiQL.Logo>
        <GraphiQL.Toolbar>
          // GraphiQL.ToolbarButton usage
          <GraphiQL.ToolbarButton
            onClick={this._onClickToolbarButton}
            title="ToolbarButton"
            label="Click Me as well!"
          />
          // Some other possible toolbar items
          <button name="GraphiQLButton">Click Me</button>
        </GraphiQL.Toolbar>
        <GraphiQL.Footer>
          // Footer works the same as Toolbar
          // add items by appending child components
        </GraphiQL.Footer>
      </GraphiQL>
   
   
   )
  }
}
