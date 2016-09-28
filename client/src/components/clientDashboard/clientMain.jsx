import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

export default class clientMain extends React.Component {
   constructor(props){
     super(props)

     this.state ={
       appointments: []
     }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
     }


  componentDidMount () {
    const that = this
    const url = `/getclientdata/${localStorage.user_id}`
     this.serverRequest = axios.get(url).then((practitioners) => {
       console.log(practitioners)
        that.setState({
          appointments: practitioners.data.appointments
        })
    })
  
  }
  componentWillUnmount () {
    this.serverRequest.abort()
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

    return (
      <div>
      {this.state.appointments.map((appointment)=> {
        const name = axios.get(`/getpname/${appointment.practId}`).then((name)=>{
          console.log(name.data.name)
        })
         
        return (
          <Card style={style}>  
            <CardHeader
              title={appointment.name}
              subtitle={appointment.date} 
             />
             <FlatButton 
              label="Begin Session" 
              primary={true}
              
           />
            </Card>
        )
    
      })}
      </div>
   )
  }
}