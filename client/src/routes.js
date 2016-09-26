import React from  'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App/App'
import Main from './components/Main/Main'
import clientMain from './components/clientDashboard/clientMain'
import pForm from './components/practitionerDashboard/pForm'

export default (
<Route path="/" component={App} > 
<Route path="/clientmain" component={clientMain} />
<Route path="/pForm" component={pForm} />
<Route path="/main" component={Main} />
</Route>


)

