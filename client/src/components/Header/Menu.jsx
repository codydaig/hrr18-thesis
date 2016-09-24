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
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';

export default class Menu extends React.Component {
   constructor(){
     super()
     this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      postalcode: '',  
      userSignUpOpen: false,
      snackBarOpen: false
}
   this.userHandleOpen = this.userHandleOpen.bind(this)
   this.userHandleClose = this.userHandleClose.bind(this)
   this.onFirstNameChange = this.onFirstNameChange.bind(this)
   this.onLastNameChange = this.onLastNameChange.bind(this)
   this.onEmailChange = this.onEmailChange.bind(this)
   this.onPasswordChange = this.onPasswordChange.bind(this)
   this.submitForm = this.submitForm.bind(this)
   this.userSnackbarOpen = this.userSnackbarOpen.bind(this)
   this.userSnackbarClose = this.userSnackbarClose.bind(this)
   this. onPostalChange = this.onPostalChange.bind(this)
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

  onPostalChange(event){
    this.setState({
      postalcode: event.target.value
    });
  }

  onPasswordChange (event) {
    this.setState({
      password: event.target.value
    });
  }
  
    userHandleOpen () {
    this.setState({userSignUpOpen: true});
 }

     userHandleClose () {
    this.setState({userSignUpOpen: false});
 }

    userSnackbarOpen () {
    this.setState({snackBarOpen: true});
 }

  userSnackbarClose () {
    this.setState({snackBarOpen: false});
 }

  submitForm () {
  const payload = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email,
    password: this.state.password
  
  }


  var auth0 = new Auth0({
    domain:      cred.Auth0options.domain,
    clientID:     cred.Auth0options.clientID,
    callbackURL:  cred.Auth0options.callbackURL,
    responseType: 'token',
    forceJSONP:   false

  });

auth0.signup({
  connection:'therappmongo',
  email: this.state.email,
  password: this.state.password,
  user_metadata: {
     firstName: this.state.firstName,
     lastName: this.state.lastName,
     postalcode: this.state.postalcode
  }
 
}, function(err){
  //console.log(err.message)
})
const userurl = `/veruser/${this.state.email}`

setTimeout(()=>{
  axios.get(userurl)
   .then((status)=>{
      if(status){
        this.userSnackbarOpen()
        this.setState({email: '',password:'', firstName: '', lastName: ''});
        this.userHandleClose()
      }
    
   
   })
},2000)


}
 
  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.userHandleClose}
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

         <Snackbar
          open={this.state.snackBarOpen}
          message="User Account Created, please check your email to confirm "
          autoHideDuration={5000}
           onRequestClose={this.userSnackbarClose}
        />
     
        <Dialog
          title="So Tell me about yourself"
          actions={actions}
          modal={false}
          open={this.state.userSignUpOpen}
          onRequestClose={this.userHandleClose}
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
          title ="postalCode"
          value={this.state.postalcode}
          onChange={this.onPostalChange}
          hintText="Postal Code"
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
         onTouchTap={this.userHandleOpen}
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
