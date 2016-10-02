import React from  'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App/App'
import Main from './components/Main/Main'
import clientMain from './components/clientDashboard/clientMain'
import pForm from './components/practitionerDashboard/pForm'
import pDash from './components/practitionerDashboard/pdashMain'
import directoryMain from './components/Directory/directoryMain'
import officeMain from './components/Office/officeMain'
import Profile from './components/Profile/Profile'
import Apollo from './components/apollotesting/apollotest'

export default (
  <Route path="/" component={App} > 
  <Route path="/clientmain" component={clientMain} />
  <Route path="/pForm" component={pForm} />
  <Route path="/main" component={Main} />
  <Route path='/pdash' component={pDash}/>
  <Route path='/directory' component={directoryMain}/>
  <Route path='/office' component={officeMain}/>
  <Route path='/profile' component={Profile}/>
  <Route path='/apollo' component={Apollo}/>
  </Route>
)