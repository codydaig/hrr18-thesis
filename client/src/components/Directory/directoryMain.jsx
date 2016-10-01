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
import FullCalendar from '../fullCalendar/fullCalendar'
import {browserHistory} from 'react-router';

export default class directoryMain extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      practitioners: [],
      currentSelection: '',
      bookOpen: false,
      bookTime: '',
      bookDate: '',
      alreadyBooked: []
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.bookApointment = this.bookApointment.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeTime = this.onChangeTime.bind(this)
    this.submitAppointment = this.submitAppointment.bind(this)

  }
  componentDidMount () {
    const that = this
    axios.get('/getall', {
      headers : {
        authorization: 'Bearer ' + localStorage.id_token
      }
    }).then((practitioners) => {
      that.setState({
        practitioners: practitioners.data
      })
    })
  }
 
  onChangeDate (event, date) { 
    this.setState({
      bookDate: date
    })
  }

  onChangeTime (event, time) {
    this.setState({
      bookTime: time
    })
  }
   
  submitAppointment () {
    const payload = {
      practId: this.state.currentSelection,
      clientId: localStorage.user_id,
      name: localStorage.name,
      date: this.state.bookDate,
      time: this.state.bookTime
    }
    axios.post('/book', {
      headers : {
        authorization: 'Bearer ' + localStorage.id_token
      }
    } ,payload)
    this.handleClose()
    browserHistory.push('/clientmain')
  } 

  bookApointment(currentSelection){
    const that = this
    this.setState({
      currentSelection: currentSelection,
      bookOpen: true
    })    
    const url = `/getbookedtime/${currentSelection}`
    axios.get(url,{
      headers : {
        authorization: 'Bearer ' + localStorage.id_token
      }
    }).then((datetime) => {
      that.setState({
        alreadyBooked: datetime.data
      })
    })
    console.log(this.state)  
  }

  handleClose () {
    this.setState({bookOpen: false});
  };

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
    return (
      <div>
      {this.state.practitioners.map((practitioner)=>{
 
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
              label="Book An Appointment" 
              primary={true}
              onTouchTap={this.bookApointment.bind(this, practitioner._id)  }
           />
             <a href={practitioner.website} target='_blank'>Website</a>
            </Card>
       
          <Dialog
          title="Choose a Date and Time for your Appointment" 
          actions={actions}
          modal={false}
          open={this.state.bookOpen}
          onRequestClose={this.handleClose}
        >
         TimeKit Calendar Goes Here
          </Dialog>
          </div>
          )  
      })}
    </div>
         
   )
  }
}
