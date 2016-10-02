import React from 'react'
import timekit from 'timekit-booking';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';

  
export default class Profile extends React.Component {

  componentDidMount () {
    var widget = new timekit()
   
    widget.init({
      email: localStorage.email,
      apiToken: 'y2BucXiB4BHRZY3DVWdWWvrmSZsEzS6g',
      calendar: '5b550089-ab29-4c58-9683-dee67d556025',
      name: "testinonetwo",
      timekitConfig: {
        app:'therapp'
      }
    }) 
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
     </Paper>

   )
  }
}



                    