import React from 'react';
import {Card, CardTitle, CardActions, CardText, Button, Textfield}  from 'react-mdl';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ReactS3Uploader from 'react-s3-uploader';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import axios from 'axios';
import timekit from 'timekit-sdk';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import ProvinceState from '../../statesprovince/stateprovince';
import Avatar from 'material-ui/Avatar';
import AccountsCircle from '../../../../node_modules/material-ui/svg-icons/action/account-circle.js';
import {Step,Stepper,StepButton,StepLabel} from 'material-ui/Stepper';
import {cyan800,grey800} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';



export default class pForm extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      oneline: '',
      website: '',
      photo: 'https://s3-us-west-2.amazonaws.com/therappimages/1476084136_human.png',
      certtype: '',
      certbody: '',
      certnumber: '',
      calendar: '',
      timekey: '',
      bio: '',
      value : 1,
      provincestate: ProvinceState.us,
      provinceStateSelection: '',
      loading: false,
      finished: false,
      stepIndex: 0
    }

    this.submitform = this.submitform.bind(this)
    this.onChangeIntro = this.onChangeIntro.bind(this)
    this.onChangeWebsite = this.onChangeWebsite.bind(this)
    this.onChangeCertType = this.onChangeCertType.bind(this)
    this.onChangeCertBody = this.onChangeCertBody.bind(this)
    this.onChangeCertNumber = this.onChangeCertNumber.bind(this)
    this.onChangeBio = this.onChangeBio.bind(this)
    this.countryChange = this.countryChange.bind(this)
    this.submitform = this.submitform.bind(this)
    this.onChangeProvinceState = this.onChangeProvinceState.bind(this)
    this.uploadComplete = this.uploadComplete.bind(this)
    this.renderPractDetails = this.renderPractDetails.bind(this)
    this.dummyAsync = this.dummyAsync.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.renderContent = this.renderContent.bind(this)


  }

  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext () {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev () {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    
    const style = {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: 'auto',
      width: '100%',
      marginTop: 30,
      position:'relative'
    }
  
    const avatarStyle ={
      position: 'relative',
      marginTop:10
    }

    switch (stepIndex) {
    case 0:
      return (
       <div>
     <Paper style={style} zDepth={2}>
   <br/>
  
  <Avatar
   style={avatarStyle}
   size={100}
   src={this.state.photo}
   backgroundColor={cyan800}   >
   
   </Avatar>
   <h6>Show your clients who you are! Upload a photo for your profile</h6>
  <ReactS3Uploader
    signingUrl="/s3/sign"
    accept="image/*"
    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
    contentDisposition="auto"
    onFinish={this.uploadComplete}
    />
   <br/>
    <h6>Tell us where in the  US or Canada you are</h6>
    
    <SelectField value={this.state.value} onChange={this.countryChange} style={{fontSize:12}}>
      <MenuItem value={1} primaryText="United States" label="United States"/>
      <MenuItem value={2} primaryText="Canada" label="Canada" />
    </SelectField>
     
    <AutoComplete
      hintText="Province or State"
      dataSource={this.state.provincestate}
      onNewRequest={this.onChangeProvinceState}
    />
    <h6>Do you have a website?</h6>
    <TextField 
     hintText="Website"
     underlineShow={true} 
     value={this.state.website }
     onChange={this.onChangeWebsite}
     />
   </Paper>
  </div>
        );
    case 1:
      return (
          <div>
            <TextField style={{marginTop: 0}} floatingLabelText="Ad group name" />
            <p>
              Ad group status is different than the statuses for campaigns, ads, and keywords, though the
              statuses can affect each other. Ad groups are contained within a campaign, and each campaign can
              have one or more ad groups. Within each ad group are ads, keywords, and bids.
            </p>
            <p>Something something whatever cool</p>
          </div>
        );
    case 2:
      return (
          <p>
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with your
            ads, find out how to tell if they're running and how to resolve approval issues.
          </p>
        );
    default:
      return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent () {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <RaisedButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }


  uploadComplete(url){
    const imgURL = 'https://s3-us-west-2.amazonaws.com/therappimages/' + url.filename
    this.setState({
      photo: imgURL
    })
  }

  countryChange (event, index, value) {
    this.setState({value})
    setTimeout(()=>{
      if(this.state.value === 1){
        this.setState({provincestate : ProvinceState.us })
      }
      else {
        this.setState({provincestate: ProvinceState.canada })
      }
      console.log(this.state)
    }, 100)
  } 

  onChangeProvinceState(value){
    this.setState({
      provinceStateSelection : value
    })
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
    const url = `/updateprofile/${localStorage.user_id}`
    const payload = {
      oneline: this.state.oneline,
      website: this.state.website,
      certtype: this.state.certtype,
      certbody: this.state.certbody,
      certnumber: this.state.certnumber,
      bio: this.state.bio,
      stateprovince : this.state.provinceStateSelection,
      photo: this.state.photo
    }
    console.log(payload, url)
    axios.post(url, payload).then(()=>{
      console.log('success')
    }).catch((err)=>{console.log(err)})
     
    this.setState({
      oneline: '',
      website: '',
      certtype: '',
      certbody: '',
      certnumber: '',
      calendar: '',
      timekey: '',
      photo: '',
      stateprovince: '',
      bio: ''
    })

    browserHistory.push('/pdash')
  }

  renderPractDetails (){
    console.log('render!!')
    return (
          <p>
            Select campaign settings. Campaign settings can include your budget, network, bidding
            options and adjustments, location targeting, campaign end date, and other settings that
            affect an entire campaign.
          </p>
        );
  }


  render () {
    const {loading, stepIndex} = this.state;

    const style = {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: 'auto',
      width: '35%',
      marginTop: 30,
      position:'relative'
    }

    const avatarStyle ={
      position: 'relative',
      marginTop:10
   
    }

    return (
   <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>General Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Practice Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
   )
  }
}

/*

 <div>
     <Paper style={style} zDepth={2}>
   <br/>
  
  <Avatar
   style={avatarStyle}
   size={100}
   src={this.state.photo}
   backgroundColor={cyan800}   >
   
   </Avatar>
   <h6>Show your clients who you are! Upload a photo for your profile</h6>
  <ReactS3Uploader
    signingUrl="/s3/sign"
    accept="image/*"
    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
    contentDisposition="auto"
    onFinish={this.uploadComplete}
    />
   <br/>
    <h6>Tell us where in the  US or Canada you are</h6>
    
    <SelectField value={this.state.value} onChange={this.countryChange} style={{fontSize:12}}>
      <MenuItem value={1} primaryText="United States" label="United States"/>
      <MenuItem value={2} primaryText="Canada" label="Canada" />
    </SelectField>
     
    <AutoComplete
      hintText="Province or State"
      dataSource={this.state.provincestate}
      onNewRequest={this.onChangeProvinceState}
    />
    <h6>Do you have a website?</h6>
    <TextField 
     hintText="Website"
     underlineShow={true} 
     value={this.state.website }
     onChange={this.onChangeWebsite}
     />
<br/>
         <RaisedButton label="Next" onTouchTap={this.renderPractDetails} primary={true} style={{width:'100%'}} />
   </Paper>
  </div>

 <TextField 
      hintText="One line introduction"
      underlineShow={true} 
      value={this.state.oneline }
      onChange={this.onChangeIntro}
    />



    <TextField 
    floatingLabelText="Professional Biography" 
    multiLine={true}
    rows={5}
    style={{fontSize:10}}
    underlineShow={true}
    value={this.state.bio}
    onChange={this.onChangeBio}
     />

 <TextField 
      hintText="Certification Type"
      underlineShow={true} 
      value={this.state.certtype }
      onChange={this.onChangeCertType}
      />
  
    <Divider />

    <TextField 
      hintText="Certiifcation Body"
      underlineShow={true}
      value={this.state.certbody }
      onChange={this.onChangeCertBody}
       />
      
    <Divider />
    
    <Divider />

    <TextField 
    hintText="Certiifcation Number"  
    value={this.state.certnumber }
    onChange={this.onChangeCertNumber}
    underlineShow={true} />
    <Divider />
    
    <Divider />

     
    <Divider />


*/