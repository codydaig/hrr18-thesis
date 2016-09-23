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
<<<<<<< HEAD

=======
import SignupForm from '../Forms/SignupForm'
>>>>>>> 6b07159cf10af2969869df72565f37a3a641da93

export default class Menu extends React.Component {
   constructor(){
     super()
     this.state = {
<<<<<<< HEAD
      open: false,
      value: ''

   
}
  this.handleOpen = this.handleOpen.bind(this)
  this.handleClosed =this.handleClosed.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.testFunc = this.testFunc.bind(this)
  }


  handleChange(){
    this.setState({
      value: event.target.value,
    });
  };

  
 handleOpen (){
    this.setState({open: true});
    console.log(this.state)
 }

  handleClosed(){
    this.setState({open: false});
    console.log(this.state)
 }
 

testFunc(){
  console.log(this)
}

=======
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
 console.log(payload)
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
          title ="name"
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
      <MenuItem primaryText="Practitioners" />
    </IconMenu>
  </div>
    )
  }
}