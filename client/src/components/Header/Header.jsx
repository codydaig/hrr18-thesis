import React from 'react'
import AppBar from 'material-ui/AppBar'
import {cyan200} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Menu from './Menu'
injectTapEventPlugin()
const headerStyle = {
  backgroundColor: cyan200
}

export default class Header extends React.Component {
  render () {
    return (
      <AppBar title='TherApp'
        style={headerStyle}
        iconElementLeft={
          <Menu />
        }
      />
    )
  }
}
   
