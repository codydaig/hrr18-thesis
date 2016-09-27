import React from 'react'
import axios from 'axios'
import directoryListItem from './directoryListItem'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';



export default class directoryMain extends React.Component {
  constructor (props){
    super(props)
    this.state = {
        practitioners: [],
        currentSelection: '',
        bookOpen: false
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.bookApointment = this.bookApointment.bind(this)
    this. handleClose = this.handleClose.bind(this)
  }
  componentDidMount () {
    const that = this
    
    this.serverRequest = axios.get('/getall').then((practitioners)=> {
        that.setState({
            practitioners: practitioners.data
        })
     })
  }
  componentWillUnmount () {
    this.serverRequest.abort()
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
        onTouchTap={this.handleClose}
      />,
    ];



    return (
      <div>
      
     
     {this.state.practitioners.map((practitioner)=>{
       
      return (

        <div>
           <Card>  
             <CardHeader
              title={practitioner.user_metadata.firstName} 
              subtitle={practitioner.user_metadata.lastName}
              avatar={practitioner.photo}
            />
           
             <FlatButton 
              label="Book An Appointment" 
              primary={true}
              onTouchTap={this.bookApointment.bind(this, practitioner._id)  }
           />
            </Card>
          
          <Dialog
          title="Choose a Date and Time for your Appointment" 
          actions={actions}
          modal={false}
          open={this.state.bookOpen}
          onRequestClose={this.handleClose}
        >
          Open a Date Picker dialog from within a dialog.
          <DatePicker hintText="Date" />
          <TimePicker  hintText="Time" />
          </Dialog>
          </div>
          )  
      })}
    </div>
         
   )
  }
}
