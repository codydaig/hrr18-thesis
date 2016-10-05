import React from 'react'
import {Card, CardTitle, CardActions, CardText, Button, Icon} from 'react-mdl'
import Flexbox from 'flexbox-react';
import {cyan100,grey800,lightBlue50} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

export default class officeMain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      session: {}
    }
  
    this.beginSession = this.beginSession.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)

  }

  componentDidMount () {
    const that = this
    const url = `/gettoken/${this.props.params.appointment}`
    console.log(url)
    this.serverRequest = axios.get(url,{
      headers : {
        authorization: 'Bearer ' + localStorage.id_token
      }
    }).then((data) => {
      console.log('data', data)
      that.setState({
        session : data.data
      })
    }).then(()=>{
    })
  }
  beginSession () {
    const SessionID = this.state.session.tokbox_session
    const Token = this.state.session.tokbox_token
    const session = OT.initSession('45693632', SessionID)
    session.connect(Token)
    const publisher = OT.initPublisher('publisher', {
      insertMode: 'insert',
      width: '100%',
      height: '100%'
    })

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

 

