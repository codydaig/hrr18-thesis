import React from 'react'
import {Card, CardTitle, CardActions, CardText, Button, Icon} from 'react-mdl'
import Flexbox from 'flexbox-react';
import {cyan100,grey800,lightBlue50} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
export default class officeMain extends React.Component {
  
  beginSession(){
    const SessionID = '2_MX40NTY5MzYzMn5-MTQ3NTQ2MDUxODU1OX5RaG9iejA1R2ZKWmVNUEc5dUNFbGdWcFV-UH4'
    const Token = 'T1==cGFydG5lcl9pZD00NTY5MzYzMiZzaWc9ZDM3MDM3MmZkZGNhYjViZWJhMjg0MTg3ODAyMmZhYTE1Yjc1MTVhZTpzZXNzaW9uX2lkPTJfTVg0ME5UWTVNell6TW41LU1UUTNOVFEyTURVeE9EVTFPWDVSYUc5aWVqQTFSMlpLV21WTlVFYzVkVU5GYkdkV2NGVi1VSDQmY3JlYXRlX3RpbWU9MTQ3NTQ2MDUyOCZub25jZT0wLjg3MTk0MTc2NzQwMDEzMDYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQ3NTQ2NDEyOA=='
  


    const session = OT.initSession('45693632', SessionID)
    session.connect(Token)
    const publisher = OT.initPublisher('publisher', {
      insertMode: 'insert',
      width: '100%',
      height: '100%'
    })

    console.log(session)
    session.publish(publisher);

    session.on('streamCreated', function(event) {
      session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      });
    })



  }
 
 
 
  render () {
    console.log(this.props)
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
      <h1> Office </h1>
       <Card shadow={2} style={right} >
          <div id='subscriber'/>
       </Card>
       <Card shadow={2} style={left} >
   
          <div id='publisher'/>
         <RaisedButton label="Begin" 
            onTouchTap={this.beginSession}
            primary={true} 
            style={button} />
         <RaisedButton label="End" secondary={true} style={button} />
       </Card>
       </div>
   )
  }
}

 

