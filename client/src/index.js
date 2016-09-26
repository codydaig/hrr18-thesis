import React from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App/App'
import {Router,browserHistory} from 'react-router'
import routes from './routes'

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
      document.getElementById('app')
    )
