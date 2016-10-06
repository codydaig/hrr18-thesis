import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {cyan100,grey800} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import {Tabs, Tab} from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router'

export default class pDash extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      appointments: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.enterWaitngRoom = this.enterWaitngRoom.bind(this)
    this.endAppointment = this.endAppointment.bind(this)
  }

  enterWaitngRoom (id) {
    browserHistory.push(`/office/${id}`)
  }

  endAppointment(id){ 
    console.log(id)

  }

  componentDidMount () {
    const that = this
    const url = `/getpractitionerdata/${localStorage.user_id}`
    this.serverRequest = axios.get(url,{
      headers : {
        authorization: 'Bearer ' + localStorage.id_token
      }
    }).then((practitioners) => {
      console.log('prac', practitioners)
      that.setState({
        appointments: practitioners.data.appointments
      })
    })
  
  }
  componentWillUnmount () {
   // this.serverRequest.abort()
  }

  render () {
    const style = {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: 500,
      margin: 'auto',
      marginTop: 30
    }

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        margin: 10
      },
    }
  
    const cardStyle = {
      width: 620, 
      top: 20,
      marginTop:12,
      color: cyan100,
      margin:10
    }

    return (
         <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Upcoming Appointments" value="a" >
          <h2 style={styles.headline}> Hello {localStorage.name} you have {this.state.appointments.length} appointment(s) </h2>
          <div>
            {this.state.appointments.map((appointment) => { 
              console.log('con', appointment)
              return ( 
                      <div>
                       <Card
                       style={cardStyle}
                       >  
                       <CardHeader
                        title={appointment.clientname}
                        subtitle={appointment.date_time}
                       > 
                      </CardHeader>
                      <CardText>
                            <RaisedButton 
                              label="Enter Waiting Room" 
                              primary={true} 
                              style={{margin: 10}} 
                              onTouchTap={this.enterWaitngRoom.bind(this, appointment.meeting_id)  }
                              />

                              <RaisedButton 
                              label="Finish Appointment" 
                              secondary={true} 
                              style={{margin: 10}}
                              onTouchTap={this.endAppointment.bind(this, appointment.meeting_id)  }
                             /> 
                              
                       </CardText>     
                      </Card>
                      </div>
                  )                
            })}      
         </div>
        </Tab>
        <Tab label="Past Appointments" value="b">
          <div>
          <h2 style={styles.headline}> Hello {localStorage.name}  </h2> <p>
             Past Appoinments go here
            </p>
          </div>
        </Tab>
      </Tabs>
   )
  }
}