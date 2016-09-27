import React from 'react'
import {Card, CardTitle, CardActions, CardText, Button}  from 'react-mdl'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ReactS3Uploader from 'react-s3-uploader';

export default class pForm extends React.Component {
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

<ReactS3Uploader
    signingUrl="/s3/sign"
    accept="image/*"
    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
    contentDisposition="auto"
    server="http://192.168.1.134:8080" 
    />



    <TextField hintText="One line introduction" underlineShow={true} />
    <Divider />
    <TextField hintText="Website"  underlineShow={true} />
    <Divider />
    <TextField hintText="Certification Type" underlineShow={true} />
    <Divider />
    <TextField hintText="Certiifcation Body"  underlineShow={true} />
    <Divider />
    <Divider />
    <TextField hintText="Certiifcation Number"  underlineShow={true} />
    <Divider />
    <Divider />
    <TextField hintText="Professional Biography"  underlineShow={true} />
    <Divider />
  </Paper>

  </div>
   )
  }
}
