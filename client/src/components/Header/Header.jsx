import React from 'react'
import AppBar from 'material-ui/AppBar'
import {cyan500,yellow100, indigo500} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {browserHistory} from 'react-router'

import Menu from './Menu'
injectTapEventPlugin()
const headerStyle = {
  backgroundColor: cyan500
}

export default class Header extends React.Component {
  test(){
    if(localStorage.type == 'client'){
      browserHistory.push('/clientmain')
    } else if (localStorage.type === 'practitioner'){
      browserHistory.push('/pDash')
    }
  }

  render () {
    return (
      <AppBar title='TherApp'
        style={headerStyle}
         onTouchTap={this.test}

        iconElementLeft={
          <Menu />
        }
      />
    )
  }
}
   
