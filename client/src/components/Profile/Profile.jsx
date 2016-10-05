import React from 'react'
import timekit from 'timekit-booking'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {green100, green500, green700} from 'material-ui/styles/colors'
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import Paper from 'material-ui/Paper'
import axios from 'axios'
import {browserHistory} from 'react-router'


  
export default class Profile extends React.Component {

  componentDidMount () {
    axios.get(`/getcalendar/${this.props.params.practitioner}`)
        .then((data)=> { 
          const name = data.data.user_metadata.firstName + " " + data.data.user_metadata.lastName
          console.log(data)
          const widget = new timekit()
          widget.init({
            email: data.data.email,
            apiToken: data.data.caltoken,
            calendar: data.data.calendar,
            name: name,
            timekitConfig: {
              app:'therapp',
              showCredits: false
            },
            callbacks: {
              createBookingSuccessful: (res) => {
                axios.post('/scheduleroom', { 
                  start: res.data.event.start,
                  client: localStorage.getItem('user_id'),
                  practitioner: this.props.params.practitioner
                }).then(() => {
                  setTimeout(() => {
                    browserHistory.push('/clientmain')
                  }, 2000)
                })
              }
            }
          }) 
        })
  }

  render () {
    const style = {
      maxWidth:'500px',
      margin:'auto',
      width: 500,
      marginRight: 200
    }
    const pstyle = {
      maxWidth:'900px',
      margin:'auto',
      width: 500,
      marginTop:20
      //right: 20
      //left: 200
    }

    const bio = {}

    return (
     <div>
     <Paper zDepth={5} >

     testing
     </Paper>

     <Paper style={style} zDepth={5} >
      <div style={pstyle} id='bookingjs'/>
     </Paper>
     
     </div>

   )
  }
}



                    