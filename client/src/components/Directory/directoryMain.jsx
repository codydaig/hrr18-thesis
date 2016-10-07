import React from 'react'
import axios from 'axios'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Divider from 'material-ui/Divider';
import {cyan100,grey800} from 'material-ui/styles/colors'
import timekit from 'timekit-sdk'
import booking from 'timekit-booking'
import {browserHistory} from 'react-router';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import reactApollo from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class directoryMainComp extends React.Component {
  constructor (props){
    super(props)
    this.checkAvailibility = this.checkAvailibility.bind(this)
  }
   
  checkAvailibility(currentSelection){
    browserHistory.push(`/profile/${currentSelection}`)
  }

  render () {
    const style = {
      maxWidth:'500px',
      margin:'auto',
      width: 600
    }

    const actions = [
      <FlatButton
        label="Book"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitAppointment}
      />
    ];

    const cardStyle = {
      width: 600, 
      margin: 'auto', 
      top: 20,
      marginTop:12,
      color: cyan100
      
    }

    const pstyle = {
      maxWidth:'900px',
      margin:'auto',
      width: 900
    }

    if(this.props.data.loading){
      return <div>Loading</div>
    } else {
      return (
      <div>
      {this.props.data.users_practs.map((practitioner)=>{
        return (
        <div>
           <Card
            style={cardStyle}
           >  
             <CardHeader
              title={practitioner.user_metadata.firstName} 
              subtitle={practitioner.user_metadata.lastName}
              avatar={practitioner.photo}
            > 
            <span>
            {practitioner.certbody}  #{practitioner.certnumber}
            </span>
              </CardHeader>
             <CardText>
             {practitioner.oneline}
            </CardText>     

             <FlatButton 
              label="Check Avalability" 
              primary={true}
              onTouchTap={this.checkAvailibility.bind(this, practitioner._id)  }
           />
            </Card>
           </div>
          )  
      })}
      
    </div>
         
       )
    }
  }
}

const getAll = gql`query MyQuery {
  users_practs{
    email
    website
    certtype
    certbody
    certnumber
    calendar
    caltoken
    photo
    bio
    oneline
    user_metadata {
      firstName
      lastName
      postalcode
    }
  }
}`

const directoryMain = graphql(getAll)(directoryMainComp)
export default directoryMain
