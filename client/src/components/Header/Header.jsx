import React from 'react'
import AppBar from 'material-ui/AppBar'
import {cyan200} from 'material-ui/styles/colors'

const headerStyle = {
  backgroundColor: cyan200
}

export default class Header extends React.Component {
  render () {
    return (
      <AppBar title='TherApp'
        style={headerStyle}
      />
    )
  }
}
