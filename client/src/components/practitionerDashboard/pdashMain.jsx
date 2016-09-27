import React from 'react'
import {Card, CardTitle, CardActions, CardText, Button}  from 'react-mdl'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';


export default class pDash extends React.Component {
  render () {
  
const style = {

 display:'flex',
 justifyContent: 'center',
 alignItems: 'center',
 flexDirection: 'column',
 width: 500,
 margin: 'auto',
 marginTop: 30
};


    return (
   <div>
     <Paper style={style} zDepth={2}>
    <h1>Practitioner DashBoard</h1>
  </Paper>
  </div>
   )
  }
}