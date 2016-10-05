import React from 'react'
import axios from 'axios'
import cred from '../../../../creds'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {cyan100,grey800} from 'material-ui/styles/colors'
import {browserHistory} from 'react-router'

export default class clientMain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      appointments: [],
      session: {},
      sessionOpen: false
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.beginSession = this.beginSession.bind(this)
    this.endSession = this.endSession.bind(this)
    this.openTokInit = this.openTokInit.bind(this)
  }

  componentDidMount () {
    const that = this
    const url = `/getclientdata/${localStorage.user_id}`
    this.serverRequest = axios.get(url,{
      headers : {
        authorization: 'Bearer ' + localStorage.id_token
      }
    }).then((practitioners) => {
      that.setState({
        appointments: practitioners.data.appointments
      })
    })
  }

  beginSession (id) {
    browserHistory.push(`/office/${id}`)
  }

  openTokInit (){

  }
  endSession () {
    this.setState({
      sessionOpen : false
    })
  }

  render () {
    const actions = [
      <FlatButton
        label="Enter Session"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.openTokInit}
      />,

      <FlatButton
        label="Leave Session"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.endSession}
      />
    ];

    const style = {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: 500,
      margin: 'auto',
      marginTop: 30
    }

    const dialogStyle = {
      width: '80%',
      maxWidth: 'none',
      maxHeight: 'none',
      height: '80%',
      backgroundColor: cyan100

    }
    return (
      <div>
      {this.state.appointments.map((appointment) => {
        return (
          <div>
          <Card style={style}>  
            <CardHeader
              avatar={appointment.photo}
              title={appointment.practname}
              subtitle={appointment.meeting_id} 
             />
             <FlatButton 
              label="Enter Waiting Room" 
              primary={true}
              onTouchTap={this.beginSession.bind(this, appointment.meeting_id )  }
             />
            </Card>
          <Dialog
          title='Please wait for the other party to arrive' 
          style={{backgroundColor: cyan100}}
          contentStyle={dialogStyle}
          modal={false}
          open={this.state.sessionOpen}
          actions={actions}
          >
            <div id='publisher'/> 
            <div id ="subscriber"></div>
          </Dialog>
         </div>
       )
      })}
      </div>
   )
  }
}