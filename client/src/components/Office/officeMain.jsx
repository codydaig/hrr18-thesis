import React from 'react'
import {Card, CardTitle, CardActions, CardText, Button, Icon} from 'react-mdl'
import Flexbox from 'flexbox-react';
import {cyan100,grey800,lightBlue50} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'


export default class officeMain extends React.Component {
  render () {

    const right= {
      height:500,
      width:500,
      margin: 20,
      border: 100,
      left: 1000,
      position: 'relative',
      backgroundColor: lightBlue50
    }

    const left = {
      height:500,
      width:500,
      margin: 20,
      border: 100,
      position: 'relative',
      bottom: 520,
      left: 140,
      backgroundColor: lightBlue50
    }

    const button = {
      top: 430,
      position: 'relative'

    }
    return (
      <div>
       <Card shadow={2} style={right} >
          <div id='publisher'/>
       </Card>
       <Card shadow={2} style={left} >
          <div id='subscriber'/>
         <RaisedButton label="Begin" primary={true} style={button} />
         <RaisedButton label="End" secondary={true} style={button} />
       </Card>
       </div>
   )
  }
}

 

