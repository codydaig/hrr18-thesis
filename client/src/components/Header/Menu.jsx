import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SignupForm from '../Forms/SignupForm'
import Auth0 from 'auth0-js'
import cred from '../../../../creds'
console.log(cred)

export default class Menu extends React.Component {
   constructor(){
     super()
     this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',  
      open: false
}
   this.handleOpen = this.handleOpen.bind(this)
   this.handleClose =this.handleClose.bind(this)
   this.onFirstNameChange = this.onFirstNameChange.bind(this)
   this.onLastNameChange = this.onLastNameChange.bind(this)
   this.onEmailChange = this.onEmailChange.bind(this)
   this.onPasswordChange = this.onPasswordChange.bind(this)
   this.submitForm = this.submitForm.bind(this)
  }

  onFirstNameChange(event){
    this.setState({
      firstName: event.target.value
    });
  }

  onLastNameChange(event){
    this.setState({
      lastName: event.target.value
    });
  }

  onEmailChange(event){
    this.setState({
      email: event.target.value
    });
  }

  onPasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }
  
 handleOpen (){
    this.setState({open: true});
 }

  handleClose(){
    this.setState({open: false});
 }

  submitForm () {
  const payload = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email,
    password: this.state.password
  }


  var auth0 = new Auth0({
    domain:       'therapp.auth0.com',
    clientID:     cred.Auth0options.clientID,
    callbackURL:  'http://localhost:8080',
    responseType: 'token',
    forceJSONP:   false

  });

auth0.signup({
  connection:'therappmongo',
  email: this.state.email,
  password: this.state.password
}, function(err){
  console.log(err.message)
})
  this.setState({email: '',password:''});
  this.handleClose()
}
 
  render () {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
              />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitForm}
      />,
    ]

    return (
     <div>
        <Dialog
          title="So Tell me about yourself"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div>

          <span>
        <TextField
          id="text-field-controlled"
          title ="First Name"
          value={this.state.firstName}
          onChange={this.onFirstNameChange}
          hintText="First Name"
          floatingLabelFixed={true}
        />

       <br/>
         <TextField
          id="text-field-controlled"
          title ="Last Name"
          value={this.state.lastName}
          onChange={this.onLastNameChange}
           hintText="Last Name"
           floatingLabelFixed={true}
        />

<br/>

      <TextField
       id="text-field-controlled"
          title ="email"
          value={this.state.email}
          onChange={this.onEmailChange}
          hintText="Email"
          floatingLabelFixed={true}
        />
   
      <br/>

<TextField
       id="text-field-controlled"
          title ="password"
          type= "password"
          value={this.state.password}
          onChange={this.onPasswordChange}
          hintText="Password"
          floatingLabelFixed={true}
        />

      </span>
      </div>

        </Dialog>     
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Sign Up"
         onTouchTap={this.handleOpen}
         label="Dialog"
          />
      <MenuItem primaryText="Sign In" />
     
     
      <MenuItem primaryText="Practitioners" 
      
         menuItems={[
          <MenuItem primaryText="Sign Up" />,
          <MenuItem primaryText="Sign In" />
        ]}
      
      
      />
   
   
    </IconMenu>
  </div>
    )
  }
}
