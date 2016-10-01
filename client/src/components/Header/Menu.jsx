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
import {blueGrey200} from 'material-ui/styles/colors'
import {browserHistory} from 'react-router'
import timekit from 'timekit-sdk'
//this file needs and entire refactor, will be done when state management with Redux/Apollo is implimented
const timekitInstance = axios.create({
   baseURL: 'https://api.timekit.io/v2',
   headers: {'Timekit-App': 'therapp'}
})

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
      userPassword: '',
      pSignupOpen: false,
      pSigninOpen: false,
      psfirstName: '',
      pslastName: '',
      psEmail: '',
      psPostal: '',
      psPassword: '',
      psLoginEmail:'',
      psLoginPassword:''
}

   this.userHandleOpen = this.userHandleOpen.bind(this)
   this.userHandleClose = this.userHandleClose.bind(this)
   this.onFirstNameChange = this.onFirstNameChange.bind(this)
   this.onLastNameChange = this.onLastNameChange.bind(this)
   this.onEmailChange = this.onEmailChange.bind(this)
   this.onEmailLoginChange = this.onEmailLoginChange.bind(this)
   this.onPasswordChange = this.onPasswordChange.bind(this)
   this.userSignup = this.userSignup.bind(this)
   this.userSnackbarOpen = this.userSnackbarOpen.bind(this)
   this.userSnackbarClose = this.userSnackbarClose.bind(this)
   this.onPostalChange = this.onPostalChange.bind(this)
   this.userSigninOpen = this.userSigninOpen.bind(this)
   this.userSigninClose = this.userSigninClose.bind(this)
   this.onPasswordLoginChange = this.onPasswordLoginChange.bind(this)
   this.login = this.login.bind(this)
   this.plogin = this.plogin.bind(this)
   this.logout = this.logout.bind(this)
   this.pSignupOpen = this.pSignupOpen.bind(this)
   this.pSignupClose = this.pSignupClose.bind(this)
   this.pSignup = this.pSignup.bind(this)
   this.onPsFirstNameChange = this.onPsFirstNameChange.bind(this)
   this.onPsLastNameChange = this.onPsLastNameChange.bind(this)
   this.onPsEmailChange = this.onPsEmailChange.bind(this)
   this.onPsPostalChange = this.onPsPostalChange.bind(this)
   this.onPsPasswordChange = this.onPsPasswordChange.bind(this)
   this.pSigninOpen = this.pSigninOpen.bind(this)
   this.pSigninClose = this.pSigninClose.bind(this)
   this.onPsEmailLoginChange = this.onPsEmailLoginChange.bind(this)
   this.onPsPasswordLoginChange = this.onPsPasswordLoginChange.bind(this)  
   this.componentDidMount  = this.componentDidMount.bind(this)
   this.ptimekitRegistration = this.ptimekitRegistration.bind(this)
   this.loginTimeKit = this.loginTimeKit.bind(this)
 }



  componentDidMount () {
   const timekitInstance = axios.create({
   baseURL: 'https://api.timekit.io/v2',
   headers: {'Timekit-App': 'therapp'}
    })
  }


  ptimekitRegistration () {
    const payload = {
    email: this.state.psEmail,
    first_name: this.state.psfirstName,
    last_name: this.state.pslastName,
    password: this.state.psPassword,
    timezone: "America/Los_Angeles"
     }

  
//create timekit user
  
const timekitInstance = axios.create({
   baseURL: 'https://api.timekit.io/v2',
   headers: {'Timekit-App': 'therapp'}
})
  timekitInstance.post('/users', payload)
           .then((data)=>{
            console.log(data)
           })
           .catch((error)=>{
           console.log(error)
           })
}

  loginTimeKit () {
     timekitInstance.post('/auth',{
       email: this.state.psLoginEmail,
       password: this.state.psLoginPassword
     },{
      headers: {'Timekit-App': 'therapp'},
     
     auth:{ 
       username: this.state.psLoginEmail,
       password: this.state.psLoginPassword
      }
   }).then((data)=>{
      console.log(data.data)
    localStorage.setItem('timekit_id', data.data.data.id)
    localStorage.setItem('timekit_token', data.data.data.api_token)
    localStorage.setItem('email', data.data.data.email)

   })


  }

 // Menubar Actions

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
  pSignupOpen (){
    this.setState({pSignupOpen: true})
  }
  pSignupClose (){
    this.setState({pSignupOpen: false})
  }

 pSigninOpen (){
    this.setState({pSigninOpen: true})
  }
  pSigninClose (){
    this.setState({pSigninOpen: false})
  }

  userSnackbarOpen () {
    this.setState({snackBarOpen: true});
  }
  userSnackbarClose () {
    this.setState({snackBarOpen: false});
  }


//Form changes to state user signup
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

//Form changes to state pracitioner signup
  onPsFirstNameChange (event) {
    this.setState({
      psfirstName: event.target.value
    });
  }
  onPsLastNameChange(event){
    this.setState({
      pslastName: event.target.value
    });
  }
  onPsEmailChange(event){
    this.setState({
      psEmail: event.target.value
    });
  }
  onPsPostalChange(event){
    this.setState({
      psPostal: event.target.value
    });
  }
  onPsPasswordChange (event) {
    this.setState({
      psPassword: event.target.value
    });
  }


 // user login changes
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

 // pracitioner login changes
  onPsEmailLoginChange(event){
    this.setState({
      psLoginEmail: event.target.value
    });
  }

   onPsPasswordLoginChange(event){
      this.setState({
        psLoginPassword:event.target.value 
      })
   }

  login(){
  console.log('client login')


    const auth0 = new Auth0({
    domain:      cred.Auth0options.client.domain,
    clientID:     cred.Auth0options.client.clientID,
    callbackURL:  cred.Auth0options.client.callbackURL,
    responseType: 'token',


  });

    auth0.login({
      connection: 'therappmongo',
      username:  this.state.userEmail,
      password:   this.state.userPassword
    }, (err, profile, id_token, access_token)=>{

  console.log('auth0', err, profile, id_token, access_token)


      localStorage.setItem('id_token', profile.idToken)
       auth0.getProfile(profile.idToken, (err, profile) => {
         if(err) {
           console.log(err)
         }


       localStorage.setItem('user_id', profile.identities[0].user_id)
       localStorage.setItem('type', 'client')
       localStorage.setItem('name', profile.user_metadata.firstName + ' '  + profile.user_metadata.lastName)
       this.forceUpdate()
       this.userSigninClose()
       browserHistory.push('/clientmain')
       });
    });
 }

plogin(){
  console.log('plogin')
    const auth0 = new Auth0({
    domain:      cred.Auth0options.p.domain,
    clientID:     cred.Auth0options.p.clientID,
    callbackURL:  cred.Auth0options.p.callbackURL,
    responseType: 'token',


  });
    
    auth0.login({
      connection: 'therappmongopractitioners',
      username:  this.state.psLoginEmail,
      password:   this.state.psLoginPassword
    }, (err, profile, id_token, access_token) => {


      localStorage.setItem('id_token', profile.idToken)
      auth0.getProfile(profile.idToken, (err, profile) => {
      localStorage.setItem('user_id', profile.identities[0].user_id)
      localStorage.setItem('type', 'pracitioner')
      localStorage.setItem('name', profile.user_metadata.firstName + ' '  + profile.user_metadata.lastName)

       if(profile.user_metadata.profileCreated === true){
            browserHistory.push('/pdash')
       } else{
         browserHistory.push('/pform')
       }

       });
    });
     
     
     this.loginTimeKit()
      this.pSigninClose()
      this.setState = {
        psLoginEmail: '',
        psLoginPassword: ''
      }
  }

  logout(){
    localStorage.setItem('user_id', null)
    localStorage.setItem('email', null)
    localStorage.setItem('type', null)
    localStorage.setItem('name', null)
    localStorage.setItem('id_token', null)
    localStorage.setItem('open_client_id', null)
    localStorage.setItem('opentok_client_id', null)
    localStorage.setItem('timekit_id', null)
    localStorage.setItem('timekit_token', null)
    browserHistory.push('/main')
    this.forceUpdate() 
  }
  
 pSignup () {
   const auth0 = new Auth0({
      domain:      cred.Auth0options.p.domain,
      clientID:     cred.Auth0options.p.clientID,
      callbackURL:  cred.Auth0options.p.callbackURL,
      responseType: 'token',
      forceJSONP:   false
  });

auth0.signup({
  auto_login: false,
  connection:'therappmongopractitioners',
  email: this.state.psEmail,
  password: this.state.psPassword,
  user_metadata: {
     firstName: this.state.psfirstName,
     lastName: this.state.pslastName,
     postalcode: this.state.psPostal,
     profileCreated: false
  }
 
}, function(err){
  //console.log(err.message)
})
const userurl = `/veruser/${this.state.psEmail}`


  this.ptimekitRegistration()

setTimeout(()=>{
  axios.get(userurl)
   .then((status)=>{
      if(status.data.registered){
        this.userSnackbarOpen()
    
        this.setState({psEmail: '',psPassword:'', psfirstName: '', pslastName: '', psPostal: ''});
        this.pSignupClose()
      }
    })
},2000)
 
   


} 

  userSignup () {
    const auth0 = new Auth0({
      domain:      cred.Auth0options.client.domain,
      clientID:     cred.Auth0options.client.clientID,
      callbackURL:  cred.Auth0options.client.callbackURL,
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

//user signup and login
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
        onTouchTap={this.userSignup}
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

// pracitioner sign up and login

   const pSignUpActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.pSignupClose}
              />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.pSignup}
      />,
    ]

    const pSignInActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.pSigninClose}
              />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.plogin}
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
          style={{backgroundColor:blueGrey200}}

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

         <Dialog
         title="Please enter email and password"
          actions={SignInActions}
          modal={false}
          open={this.state.userSigninOpen}
          onRequestClose={this.userHandleClose}
          style={{backgroundColor:blueGrey200}}

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

        <Dialog
          title="Practitioner Signup"
          actions={pSignUpActions}
          modal={false}
          open={this.state.pSignupOpen}
          onRequestClose={this.userHandleClose}
          style={{backgroundColor:blueGrey200}}
        >
          <div>

          <span>
        <TextField
          id="text-field-controlled"
          title ="First Name"
          value={this.state.psfirstName}
          onChange={this.onPsFirstNameChange}
          hintText="First Name"
          floatingLabelFixed={true}
        />

       <br/>
         <TextField
          id="text-field-controlled"
          title ="Last Name"
          value={this.state.pslastName}
          onChange={this.onPsLastNameChange}
           hintText="Last Name"
           floatingLabelFixed={true}
        />

       <br/>

      <TextField
       id="text-field-controlled"
          title ="email"
          value={this.state.psEmail}
          onChange={this.onPsEmailChange}
          hintText="Email"
          floatingLabelFixed={true}
        />
   
      <br/>

       <TextField
       id="text-field-controlled"
          title ="postalCode"
          value={this.state.psPostal}
          onChange={this.onPsPostalChange}
          hintText="Postal Code"
          floatingLabelFixed={true}
        />

        <br/>

      <TextField
          id="text-field-controlled"
          title ="password"
          type= "password"
          value={this.state.psPassword}
          onChange={this.onPsPasswordChange}
          hintText="Password"
          floatingLabelFixed={true}
        />

      </span>
      </div>

    </Dialog>    

   <Dialog
         title="Please enter email and password"
          actions={pSignInActions}
          modal={false}
          open={this.state.pSigninOpen}
          onRequestClose={this.pSigninClose}
          style={{backgroundColor:blueGrey200}}

        >
          <span>

        <TextField
          id="text-field-controlled"
          title ="email"
          value={this.state.psLoginEmail}
          onChange={this.onPsEmailLoginChange}
          hintText="Email"
          floatingLabelFixed={true}
        />
 
      <br/>
          <TextField
          id="text-field-controlled"
          title ="password"
          type= "password"
          value={this.state.psLoginPassword}
          onChange={this.onPsPasswordLoginChange}
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
          <MenuItem primaryText="Sign Up"
             onTouchTap={this.pSignupOpen}
          
           />,
          <MenuItem primaryText="Sign In" 
            onTouchTap={this.pSigninOpen}
          />
        ]}
      />
   
        <MenuItem primaryText="Logout"
          onTouchTap={this.logout}
          label="Dialog"
          href='/main'
          />
    </IconMenu>

  </div>
    )
  }
}
