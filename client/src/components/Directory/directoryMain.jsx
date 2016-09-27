import React from 'react'
import axios from 'axios'
import directoryListItem from './directoryListItem'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class directoryMain extends React.Component {
  constructor (props){
    super(props)
    this.state = {
        practitioners: [],
        currentSelection: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.bookApointment = this.bookApointment.bind(this)
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
       currentSelection: currentSelection
     })    
   
  }

  render () {

    return (
      <div>
     {this.state.practitioners.map((practitioner)=>{
       
      return (
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
          )  
      })}
    </div>
         
   )
  }
}
