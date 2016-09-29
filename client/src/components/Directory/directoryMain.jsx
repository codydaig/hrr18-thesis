import React from 'react'
import axios from 'axios'
import directoryListItem from './directoryListItem'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Divider from 'material-ui/Divider';
import {cyan100,grey800} from 'material-ui/styles/colors'

export default class directoryMain extends React.Component {
  constructor (props){
    super(props)
    this.state = {
        practitioners: [],
        currentSelection: '',
        bookOpen: false,
        bookTime: '',
        bookDate: ''
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
     this.serverRequest = axios.get('/getall').then((practitioners) => {
        that.setState({
            practitioners: practitioners.data
        })
     })
  }
  componentWillUnmount () {
    this.serverRequest.abort()
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
    axios.post('/book', payload)
    this.handleClose()
    browserHistory.push('/clientmain')
  } 

  bookApointment(currentSelection){
     this.setState({
       currentSelection: currentSelection,
       bookOpen: true
     })    
   
  }

   handleClose () {
    this.setState({bookOpen: false});
  };

  render () {

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
                    

             <FlatButton 
              label="Book An Appointment" 
              primary={true}
              onTouchTap={this.bookApointment.bind(this, practitioner._id)  }
           />
             <a href={practitioner.website} target='_blank'>Website</a>
            </Card>
         
        <Divider />

          <Dialog
          title="Choose a Date and Time for your Appointment" 
          actions={actions}
          modal={false}
          open={this.state.bookOpen}
          onRequestClose={this.handleClose}
        >
          <DatePicker 
            hintText="Date"
            onChange={this.onChangeDate}
             />
          
          <TimePicker  
            hintText="Time"
            onChange={this.onChangeTime}
             />

          </Dialog>
          </div>
          )  
      })}
    </div>
         
   )
  }
}
