import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import {cyan100,grey800} from 'material-ui/styles/colors'
import cred from '../../../../creds'

export default class clientMain extends React.Component {
   constructor(props){
     super(props)

     this.state = {
       appointments: [],
       session: {},
       sessionOpen: false
     }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this.beginSession = this.beginSession.bind(this)
        this.endSession = this.endSession.bind(this)
        this.openTokInit = this.openTokInit.bind(this)
     }


  componentDidMount () {
    const that = this
    const url = `/getclientdata/${localStorage.user_id}`
     this.serverRequest = axios.get(url).then((practitioners) => {
        that.setState({
          appointments: practitioners.data.appointments
        })
    })
  
  }
  componentWillUnmount () {
    this.serverRequest.abort()
  }

  beginSession (id) {
   const that = this
   const url = `/gettoken/${id}`
   axios.get(url).then((session) => {
     that.setState({
       session: session.data
     })
   }).then( () => {
     this.setState({
       sessionOpen : true
     })
   })
}

openTokInit (){
  const session = OT.initSession(cred.tokbox.apikey, this.state.session.tokbox_session)
  session.connect(this.state.session.tokbox_token, (error) => {
      if(!error){
             var publisher = OT.initPublisher('publisher', {
              insertMode: 'append',
              width: '100%',
              height: '100%'
            });
            session.publish(publisher)

      } else {
        console.log('There was an error connecting to the session:', error.code, error.message);
      }
  })


  console.log(this.state.session.tokbox_token)
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
        seconday={true}
        keyboardFocused={true}
        onTouchTap={this.openTokInit}
      />,

      <FlatButton
        label="Leave Session"
        primary={true}
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
      {this.state.appointments.map((appointment)=> {
        return (
          <div>
          <Card style={style}>  
            <CardHeader
              title={appointment.practname}
              subtitle={appointment.date} 
             />
             <FlatButton 
              label="Begin Session" 
              primary={true}
              onTouchTap={this.beginSession.bind(this, appointment.aptId )  }
             
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

           <div id='publisher'> </div>
           <div id ="subscriber"></div>

          </Dialog>


   </div>
            
        )
    
      })}
      </div>
   )
  }
}