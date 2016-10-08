import React from 'react'
import timekit from 'timekit-booking'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {green100, green500, green700} from 'material-ui/styles/colors'
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import Paper from 'material-ui/Paper'
import axios from 'axios'
import {browserHistory} from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
  
export default class Profile extends React.Component {
  constructor(){
    super()
    this.state = {
      profile: {},
      user_metadata: {}
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount () {
    const that = this
    axios.get(`/getcalendar/${this.props.params.practitioner}`)
        .then((data)=> { 
          const name = data.data.user_metadata.firstName + " " + data.data.user_metadata.lastName
          console.log(data)
          const widget = new timekit()
          widget.init({
            email: data.data.email,
            apiToken: data.data.caltoken,
            calendar: data.data.calendar,
            name: 'Book with ' + name,
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
  
    axios.get(`/getpractitionerdata/${this.props.params.practitioner}`)
      .then((data)=>{ 
        console.log('data', data.data)
        that.setState({
          profile: data.data,
          user_metadata: data.data.user_metadata
        })
      }).then(()=>{
        console.log('state', this.state)
      })
    

  }

  render () {

    const pstyle = {
      margin:'auto',
      width: 500,
      position: 'fixed',
      left: 1000,
      bottom: 200
   
    }

    const bio = {
      width: 700,
      marginTop: 20,
      margin: 50

    }
    if(!this.state.user_metadata){
      return <div>Loading</div>
    } else{
      return (
     <div>
      <Card
      style={bio}
           >  
             <CardHeader
              title={this.state.user_metadata.firstName}
              subtitle={this.state.user_metadata.lastName}
              avatar={this.state.profile.photo}
              > 
             <a href={this.state.profile.website}>Website</a>
             <h4>{this.state.profile.certbody}  : {this.state.profile.certnumber} : {this.state.profile.certtype}</h4>
             </CardHeader>
             <CardText>
             {this.state.profile.bio} 
             </CardText>     
            </Card>
          <Paper style={pstyle}  zDepth={10} >  
        <div style={pstyle} id='bookingjs'/>
        </Paper>
     </div>
        )
    }
  }
}                    