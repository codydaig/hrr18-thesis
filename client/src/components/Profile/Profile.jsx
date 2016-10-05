import React from 'react'
import timekit from 'timekit-booking';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';
import axios from 'axios'

  
export default class Profile extends React.Component {

  componentDidMount () {
    axios.get(`/getcalendar/${this.props.params.practitioner}`)
        .then((data)=> { 
          const widget = new timekit()
          widget.init({
            email: data.data.email,
            apiToken: data.data.caltoken,
            calendar: data.data.calendar,
            name: "testinonetwo",
            timekitConfig: {
              app:'therapp'
            }
          }) 
          console.log(widget)
                    
          console.log('data!', data.data.calendar)})
     
  }

  render () {
    const style = {
      maxWidth:'500px',
      margin:'auto',
      width: 600
    }
    const pstyle = {
      maxWidth:'900px',
      margin:'auto',
      width: 600,
      marginTop:20
    }

    return (
     <Paper style={style} zDepth={5} >
      <div style={pstyle} id='bookingjs'/>
      {console.log(this)}
     </Paper>

   )
  }
}



                    