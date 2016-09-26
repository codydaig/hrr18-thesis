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
      userSigninOpen: false,
      snackBarOpen: false,
      userEmail: '',
      userPassword: ''
}
   this.userHandleOpen = this.userHandleOpen.bind(this)
   this.userHandleClose = this.userHandleClose.bind(this)
   this.onFirstNameChange = this.onFirstNameChange.bind(this)
   this.onLastNameChange = this.onLastNameChange.bind(this)
   this.onEmailChange = this.onEmailChange.bind(this)
   this.onEmailLoginChange = this.onEmailLoginChange.bind(this)
   this.onPasswordChange = this.onPasswordChange.bind(this)
   this.submitForm = this.submitForm.bind(this)
   this.userSnackbarOpen = this.userSnackbarOpen.bind(this)
   this.userSnackbarClose = this.userSnackbarClose.bind(this)
   this.onPostalChange = this.onPostalChange.bind(this)
   this.userSigninOpen = this.userSigninOpen.bind(this)
   this.userSigninClose = this.userSigninClose.bind(this)
   this.onPasswordLoginChange = this.onPasswordLoginChange.bind(this)
   this.login = this.login.bind(this)

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

  onEmailLoginChange(event){
    this.setState({
      userEmail: event.target.value
    });
  }

  onPasswordLoginChange(event){
    this.setState({
      userPassword: event.target.value
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


    userSigninOpen () {
    this.setState({userSigninOpen: true});
 }

    userSigninClose () {

    this.setState({userSigninOpen: false});
 }

    userSnackbarOpen () {
    this.setState({snackBarOpen: true});
 }

  userSnackbarClose () {
    this.setState({snackBarOpen: false});
 }

  login(){
    console.log(this.state)

    const auth0 = new Auth0({
    domain:      cred.Auth0options.domain,
    clientID:     cred.Auth0options.clientID,
    callbackURL:  cred.Auth0options.callbackURL,
    responseType: 'token',


  });

    auth0.login({
      connection: 'therappmongo',
      username:  this.state.userEmail,
      password:   this.state.userPassword
    }, (err, profile, id_token, access_token)=>{
      localStorage.setItem('id_token', profile.idToken)
       auth0.getProfile(profile.idToken, (err, profile) => {
         if(err) {
           console.log(err)
         }
       localStorage.setItem('user_id', profile.identities[0].user_id)
       });
    });
  }

  submitForm () {
    const auth0 = new Auth0({
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
      if(status.data.registered){
        this.userSnackbarOpen()
        this.setState({email: '',password:'', firstName: '', lastName: '', postalcode: ''});
        this.userHandleClose()
      }
    })
},2000)

}
 
  render () {
    const SignUpActions = [
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

    const SignInActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.userSigninClose}
              />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.login}
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
          actions={SignUpActions}
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
          onChange={this.onPasswordLoginChange}
          hintText="Password"
          floatingLabelFixed={true}
        />

      </span>
      </div>

    </Dialog>    

         <Dialog
         title="Please enter email and password"
          actions={SignInActions}
          modal={false}
          open={this.state.userSigninOpen}
          onRequestClose={this.userHandleClose}
        >
          <span>

        <TextField
          id="text-field-controlled"
          title ="email"
          value={this.state.userEmail}
          onChange={this.onEmailLoginChange}
          hintText="Email"
          floatingLabelFixed={true}
        />
   
      <br/>
          <TextField
          id="text-field-controlled"
          title ="password"
          type= "password"
          value={this.state.userPassword}
          onChange={this.onPasswordLoginChange}
          hintText="Password"
          floatingLabelFixed={true}
        />

      </span>
    
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
      <MenuItem primaryText="Sign In"
         onTouchTap={this.userSigninOpen}
         label="Dialog"
       />
     
     
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
