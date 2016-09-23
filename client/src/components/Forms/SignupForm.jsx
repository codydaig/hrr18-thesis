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

export default class SignupForm extends React.Component {
   constructor(props){
     super(props)
     this.state = {
      value: ''
}
  this.handleOpen = this.handleOpen.bind(this)
  this.handleClosed =this.handleClosed.bind(this)
  this.handleChange = this.handleChange.bind(this)
  
      console.log('props', this.props, props)


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
        onTouchTap={this.handleClose}
        onClick={this.testFunc}
      />,
    ]

    return (
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
          value={this.state.value}
          onChange={this.handleChange}
          hintText="First Name"
          floatingLabelFixed={true}
        />

       <br/>
         <TextField
          id="text-field-controlled"
          title ="name"
          value={this.state.value}
          onChange={this.handleChange}
           hintText="Last Name"
           floatingLabelFixed={true}
        />

<br/>

      <TextField
       id="text-field-controlled"
          title ="email"
          value={this.state.value}
          onChange={this.handleChange}
          hintText="Email"
          floatingLabelFixed={true}
        />
   
      <br/>

       <TextField
       id="text-field-controlled"
          title ="password"
          value={this.state.value}
          onChange={this.handleChange}
          hintText="Password"
          floatingLabelFixed={true}
        />

      
      </span>
        </div>
        </Dialog>     
    )
  }
}