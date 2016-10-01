import React from 'react'
import {Card, CardTitle, CardActions, CardText, Button, Textfield}  from 'react-mdl'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ReactS3Uploader from 'react-s3-uploader';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import axios from 'axios';
import timekit from 'timekit-sdk'
export default class pForm extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      oneline: '',
      website: '',
      certtype: '',
      certbody: '',
      certnumber: '',
      calendar: '',
      timekey: '',
      bio: ''
    }

    this.submitform = this.submitform.bind(this)
    this.onChangeIntro = this.onChangeIntro.bind(this)
    this.onChangeWebsite = this.onChangeWebsite.bind(this)
    this.onChangeCertType = this.onChangeCertType.bind(this)
    this.onChangeCertBody = this.onChangeCertBody.bind(this)
    this.onChangeCertNumber = this.onChangeCertNumber.bind(this)
    this.onChangeBio = this.onChangeBio.bind(this)
    this.submitform = this.submitform.bind(this)
  }

  onChangeIntro(event){
    this.setState({
      oneline: event.target.value
    })
  }

  onChangeWebsite(event){
    this.setState({
      website: event.target.value
    })
  }

  onChangeCertType(event){
    this.setState({
      certtype: event.target.value
    })
  }

  onChangeCertBody(event){
    this.setState({
      certbody: event.target.value
    })
  }

  onChangeCertNumber(event){
    this.setState({
      certnumber: event.target.value
    })
  }

  onChangeBio (event){
    this.setState({
      bio: event.target.value
    })
  }

  submitform () {
    const that = this
    timekit.configure({
      app: 'therapp'
    })

    timekit.setUser(localStorage.email,localStorage.timekit_token)
    timekit.createCalendar({
      "name": localStorage.name + " Calendar",
      "description": "TherApp Calendar"
    })
     .then((data)=> {
       console.log('data', data.data.id)
       that.setState({
         calendar: data.data.id,
         timekey: data.data.api_token
       })
     }).then( () => {
       const url = `/updateprofile/${localStorage.user_id}`
       const payload = {
         oneline: this.state.oneline,
         website: this.state.website,
         certtype: this.state.certtype,
         certbody: this.state.certbody,
         certnumber: this.state.certnumber,
         bio: this.state.bio,
         calendar: this.state.calendar,
         profilecreated: true
       }
       axios.post(url, {
         headers : {
           authorization: 'Bearer ' + localStorage.id_token
         }
       }, payload).then(()=>{
         browserHistory.push('/pdash')
       })
     })
  }

  render () {
    const style = {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: 500,
      margin: 'auto',
      marginTop: 15
    }

    return (
   <div>
     <Paper style={style} zDepth={2}>
   <br/>

  <ReactS3Uploader
    signingUrl="/s3/sign"
    accept="image/*"
    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
    contentDisposition="auto"
    server="http://192.168.1.134:8080" 
    />

    <TextField 
      hintText="One line introduction"
      style={{fontSize:12}}
      underlineShow={true} 
      value={this.state.oneline }
      onChange={this.onChangeIntro}
    />
    <Divider />

    <TextField 
     hintText="Website"
     style={{fontSize:12}}
     underlineShow={true} 
     value={this.state.website }
     onChange={this.onChangeWebsite}
     />

    <Divider />
    <TextField 
      hintText="Certification Type"
      style={{fontSize:12}}
      underlineShow={true} 
      value={this.state.certtype }
      onChange={this.onChangeCertType}
      />
  
    <Divider />

    <TextField 
      hintText="Certiifcation Body"
      style={{fontSize:12}}
      underlineShow={true}
      value={this.state.certbody }
      onChange={this.onChangeCertBody}
       />
      
    <Divider />
    
    <Divider />

    <TextField 
    hintText="Certiifcation Number"  
    style={{fontSize:12}}
    value={this.state.certnumber }
    onChange={this.onChangeCertNumber}
    underlineShow={true} />
    <Divider />
    
    <Divider />
    <TextField 
    floatingLabelText="Professional Biography" 
    multiLine={true}
    rows={5}
    style={{fontSize:10}}
    underlineShow={true}
    value={this.state.bio}
    onChange={this.onChangeBio}
     />
     
    <Divider />
      <RaisedButton label="Submit" onTouchTap={this.submitform} primary={true} style={style} />
   </Paper>
  </div>
   )
  }
}