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
import {GridList, GridTile} from 'material-ui/GridList'
import {List, ListItem} from 'material-ui/List'
import {Tabs, Tab} from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'
import reactApollo from 'react-apollo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class clientMainComp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      appointments: [],
      session: {},
      sessionOpen: false,
      value: 'a'
    }
    this.enterWaitngRoom = this.enterWaitngRoom.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange (value){ 
    this.setState({
      value: value,
    })
  }

  enterWaitngRoom (id) {
    browserHistory.push(`/office/${id}`)
  }

  render () {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        margin: 20
      },
    }

    const dialogStyle = {
      width: '80%',
      maxWidth: 'none',
      maxHeight: 'none',
      height: '80%',
      backgroundColor: cyan100,
      margin:20
    }

    const cardStyle = {
      width: 700, 
      top: 20,
      marginTop:12,
      color: cyan100,
      margin: 20
    }
   
    if(this.props.data.loading){
      return <div>Loading</div>
    } else {
      console.log(this.props.data)
      return (
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
               >
               <Tab label="Upcoming Appointments" value="a" >
               <h2 style={styles.headline}> Hello {localStorage.name} you have {this.props.data.users_client.appointments.length} appointment(s) </h2>
               <div>
               {this.props.data.users_client.appointments.map((appointment) => { 
                 return ( 
                         <div>
                         <Card
                           style={cardStyle}
                         >  
                         <CardHeader
                          title={appointment.practname}
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
}


const getAll = gql`query getApointments {
  users_client(id:"57edaf3f67bae50100d5dadb") {
    appointments {
      clientname
      practname
      meeting_id
      client_id
      pract_id
      date_time
   }
    user_metadata{
      firstName
      lastName
    }
   }
}`

const clientMain = graphql(getAll,{
  options:{pollInterval:200}
})(clientMainComp)
export default clientMain